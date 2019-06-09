// API helpers
export default class Http {

  constructor() {
    this.baseHeaders = {'Content-Type': 'application/json'};
    this.headers = this.baseHeaders;
    // this.headers.append('Access-Control-Allow-Origin', 'http://localhost:3000');
    // this.headers.append('Access-Control-Allow-Credentials', 'true');
    this.errorHandlers = {};
  }

  // Usage:
  //   http.addErrorHandler(403, onAuthError)
  //   http.addErrorHandler([401,403], onAuthError)
  // error handlers get an error as a param and return:
  //   false to cause the exception to be thrown
  //   undefined to cause the request to be retried
  //   anything else to return that value from the handler
  addErrorHandler(status, handler) {
    if (typeof status === 'object') {
      for (let s of status) {
        this.errorHandlers[s] = handler;
      }
    } else {
      this.errorHandlers[status] = handler;
    }
  }

  formatQuery(params) {
    let esc = encodeURIComponent;
    let query = Object.keys(params)
      .map(k => esc(k) + '=' + esc(params[k]))
      .join('&');
    return query;
  }

  formatFormBody(args) {
    const params = new URLSearchParams();
    for (const key in args) {
      params.append(key, args[key]);
    }
    return params;
  }

  formatJsonBody(args) {
    return JSON.stringify(args);
  }

  async request(method, url, params, body) {
    const maxAttempts = 10;
    for (let attempt=0; attempt < maxAttempts; attempt++) {
      try {
        return await this.rawRequest(method, url, params, body);
      } catch (err) {
        // if there is no status code or no handler for the status code, throw
        // if the handler returns false throw
        // if the handler returns true retry
        // if the handler returns something else, return that value
        if (!err.status) throw err;
        const handler = this.errorHandlers[err.status];
        const handled = handler ? await handler(err) : false;
        if (handled === false) throw err;
        if (handled !== true) return handled;
      }
    }
  }

  async rawRequest(method, url, params, body) {
    const opts = {
      method: method,
      mode: 'cors',
      headers: this.headers,
      body: body
    };
    if (params !== undefined) {
      url += '?' + this.formatQuery(params);
    }
    let response = await fetch(url, opts);
    if (response.ok) {
      return await response.json();
    }
    let err = Error(response.status);
    err.status = response.status;
    err.url = url;
    err.opts = opts;
    err.response = response;
    throw err;
  }
}
