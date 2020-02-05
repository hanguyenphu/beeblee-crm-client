import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Row } from "react-materialize";
import { Redirect } from "react-router-dom";
function mapStateToProps(state) {
  return {};
}

class NotFound extends Component {
  render() {
    return (
      <div>
        <Row style={{ marginTop: "20px" }}></Row>
        <section className="page_404 radius-corner">
          <div className="container">
            <div className="row">
              <div className="s12 ">
                <div className="s10 col-sm-offset-1  text-center">
                  <div className="four_zero_four_bg">
                    <h1 className="text-center ">404</h1>
                  </div>

                  <div className="contant_box_404">
                    <h3 className="h2">Look like you're lost</h3>

                    <h6>The page you are looking for not avaible!</h6>

                    <a href="/projects">
                      <Button className="gradient-btn btn-red"> Go Home</Button>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default connect(mapStateToProps)(NotFound);
