import React, { Component } from "react";
import "./DisplayArea.css";

class DisplayArea extends Component {
  render() {
    return(
      <div className="displayArea">
        {this.props.children}
      </div>
    )
  }
}

export default DisplayArea;
