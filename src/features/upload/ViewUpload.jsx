import React, { Component } from "react";
import { connect } from "react-redux";
import API from "../../utils/API/API";
import {Row, Button, Icon} from "react-materialize"
function mapStateToProps(state) {
  return {};
}

class ViewUpload extends Component {
  state = {
    url: ""
  };
  componentDidMount() {
    const uploadId = this.props.match.params.id;
    API.get(`/individual-upload/${uploadId}`)
      .then(response => {
        this.setState({
          url: response.data.url
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  handleGoBack = (e) => {
      this.props.history.goBack()
  }
  render() {
    const { url } = this.state;
    return (
      <div>
        <Row style={{ marginTop: "20px" }}>
          <Button
            node="button"
            type="submit"
            waves="light"
            className="gradient-btn btn-white"
            onClick={this.handleGoBack}
          >
            Go Back
            <Icon left>arrow_back</Icon>
          </Button>
        </Row>
        <img src={url} style={{ height: "100%", width: "100%" }} />
      </div>
    );
  }
}

export default connect(mapStateToProps)(ViewUpload);
