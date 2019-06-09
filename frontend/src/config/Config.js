export default class Config {}

Config.sessionAPI = process.env.REACT_APP_SESSION_API;
Config.operatorAPI = process.env.REACT_APP_OPERATOR_API;
Config.operandAPI = process.env.REACT_APP_OPERAND_API;

Object.freeze(Config);
