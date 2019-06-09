import Config from '../config/Config';

export default class OperandAPI {

  constructor(http) {
    this.http = http;
    this.operandAPI = Config.operandAPI;
  }

  async submitOperand(operand, token) {
    const url = `${this.operandAPI}/${operand}/${token}`;
    return await this.http.request('POST', url);
  }

}
