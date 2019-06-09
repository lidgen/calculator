import Config from '../config/Config';

export default class SessionAPI {

  constructor(http) {
    this.http = http;
    this.sessionAPI = Config.sessionAPI;
  }

  async startSession() {
    const url = `${this.sessionAPI}`;
    return await this.http.request('POST', url);
  }

  async deleteSession(token) {
    const url = `${this.sessionAPI}/${token}`;
    return await this.http.request('DELETE', url);
  }

}
