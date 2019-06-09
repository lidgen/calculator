import Config from '../config/Config';

export default class OperatorAPI {

  constructor(http) {
    this.http = http;
    this.operatorAPI = Config.operatorAPI;
  }

  async submitOperator(operator, token) {
    const url = `${this.operatorAPI}/${operator}/${token}`;
    return await this.http.request('POST', url);
  }

}
