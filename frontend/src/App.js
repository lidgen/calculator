import React, { Component } from "react";
import "./App.css";
import Button from "./components/Button";
import DisplayArea from "./components/DisplayArea";
import ClearButton from "./components/ClearButton";
import Http from './api/Http';
import OperandAPI from './api/OperandApi';
import OperatorAPI from './api/OperatorApi';
import SessionAPI from './api/SessionApi';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      display: "0",
      token: "",
      opearndSubmitted: false,
      showResult: false
    };

    this.http = new Http();
    this.sessionApi = new SessionAPI(this.http);
    this.operandApi = new OperandAPI(this.http);
    this.operatorApi = new OperatorAPI(this.http);
  }

  addToInput = val => {
    if (this.state.opearndSubmitted === true ||
      this.state.showResult === true) {
      this.state.display = "";
      this.state.opearndSubmitted = false;
      this.state.showResult = false;
    }
    if (this.state.display === "0") {
      this.state.display = ""
    }
    this.setState({ display: this.state.display + val });
  };

  addDecimal = val => {
    // only add decimal if there is no current decimal point present in the display area
    if (this.state.display.indexOf(".") === -1) {
      if (this.state.opearndSubmitted === true ||
        this.state.showResult === true) {
        this.state.display = "";
        this.state.opearndSubmitted = false;
        this.state.showResult = false;
      }
      this.setState({ display: this.state.display + val });
    }
  };

  addZeroToInput = val => {
    // if this.state.display is not empty then add zero
    if (this.state.display !== "") {
      if (this.state.opearndSubmitted === true ||
        this.state.showResult === true) {
        this.state.display = "";
        this.state.opearndSubmitted = false;
        this.state.showResult = false;
      }
      if (this.state.display === "0") {
        this.state.display = ""
      }
      this.setState({ display: this.state.display + val });
    }
  };

  clearInput = () => {
    this.deleteSession()
    this.startSession()
  };

  add = () => {
    this.submitOperandOperator("plus");
  };

  subtract = () => {
    this.submitOperandOperator("minus");
  };

  multiply = () => {
    this.submitOperandOperator("time");
  };

  divide = () => {
    this.submitOperandOperator("divide");
  };

  evaluate = () => {
    this.submitOperandEqualOperator("equal");
  };

  async submitOperandEqualOperator(operator) {
    if (this.state.display != "") {
      // console.log("submit operand", this.state.display);
      this.operandApi.submitOperand(this.state.display, this.state.token);
      this.state.display = "";
      this.state.opearndSubmitted = true;
    }
    const response = await this.operatorApi.submitOperator(operator, this.state.token);
    // console.log("submit operator", operator)
    // console.log(response)
    this.setState({ display: response.result });
    this.state.showResult = true
  }

  async startSession() {
    const response = await this.sessionApi.startSession();
    this.setState({ display: "0" });
    this.state.token = response.token;
    this.state.opearndSubmitted = false;
    this.state.showResult = false;
  }

  async deleteSession() {
    if (this.state.token != "") {
      const response = await this.sessionApi.deleteSession(this.state.token);
    }
  }

  async submitOperandOperator(operator) {
    if (this.state.display != "" && this.state.showResult === false) {
      // console.log("submit operand", this.state.display);
      this.operandApi.submitOperand(this.state.display, this.state.token);
      this.state.display = "";
      this.state.opearndSubmitted = true;
    }
    const response = await this.operatorApi.submitOperator(operator, this.state.token);
    // console.log("submit operator", operator)
    // console.log(response)
    this.setState({ display: response.result });
    this.state.showResult = true
  }

  render() {
    return (
      <div className="App">
        <div className="calc-wrapper">
          <div className="row">
            <DisplayArea>{this.state.display}</DisplayArea>
          </div>
          <div className="row">
            <Button handleClick={this.addToInput}>7</Button>
            <Button handleClick={this.addToInput}>8</Button>
            <Button handleClick={this.addToInput}>9</Button>
            <Button handleClick={this.divide}>/</Button>
          </div>
          <div className="row">
            <Button handleClick={this.addToInput}>4</Button>
            <Button handleClick={this.addToInput}>5</Button>
            <Button handleClick={this.addToInput}>6</Button>
            <Button handleClick={this.multiply}>*</Button>
          </div>
          <div className="row">
            <Button handleClick={this.addToInput}>1</Button>
            <Button handleClick={this.addToInput}>2</Button>
            <Button handleClick={this.addToInput}>3</Button>
            <Button handleClick={this.subtract}>-</Button>
          </div>
          <div className="row">
            <Button handleClick={this.addZeroToInput}>0</Button>
            <Button handleClick={this.addDecimal}>.</Button>
            <Button handleClick={this.evaluate}>=</Button>
            <Button handleClick={this.add}>+</Button>
          </div>
          <div className="row">
            <ClearButton handleClear={this.clearInput}>AC</ClearButton>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
