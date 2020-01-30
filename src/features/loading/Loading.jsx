import React, { Component } from "react";
import { Row, Col, Preloader } from "react-materialize";
class Loading extends Component {
  render() {
    return (
      <div className="row">
        <div id="dots5">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>

    );
  }
}

export default Loading;
