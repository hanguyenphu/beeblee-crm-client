import React, { Component } from "react";
import { connect } from "react-redux";
import { Row, TextInput, Button } from "react-materialize";
import API from "../../utils/API/API";
import Loading from "../loading/Loading";
function mapStateToProps(state) {
  return {};
}

class UploadForm extends Component {
  state = {
    upload: {
      title: "",
      description: "",
      file: null
    },
    edited: false,
    loading: false,
    successMessage: "",
    errorMessage: ""
  };

  handleSubmit = e => {
    e.preventDefault();
    this.setState({
      loading: true
    });
    const { upload } = this.state;
    const { projectId } = this.props;
    let data = new FormData();
    data.append("file", upload.file);
    data.append("title", upload.title);
    data.append("description", upload.description);
    API.post(`/uploads/${projectId}`, data)
      .then(response => {
        this.setState({
          successMessage: "File Upload Successfully",
          errorMessage: "",
          loading: false
        });
        this.props.getProjectDetail();
      })
      .catch(error => {
        this.setState({
          successMessage: "",
          loading: false,
          errorMessage: "Errors have been occurred!"
        });
      });
  };
  handleChange = e => {
    const field = e.target.name;
    let upload = this.state.upload;
    if (field === "file") {
      upload.file = e.target.files[0];
    } else {
      upload[field] = e.target.value;
    }
    this.setState({
      upload,
      edited: true
    });
  };
  render() {
    const { edited, loading } = this.state;
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <Row>
            <TextInput
              s={12}
              l={6}
              m={6}
              xl={6}
              label="Title:"
              name="title"
              //   value={account.domain}
              onChange={this.handleChange}
              required
            />
            <TextInput
              s={12}
              l={6}
              m={6}
              xl={6}
              label="Description:"
              name="description"
              //   value={account.domain}
              onChange={this.handleChange}
            />
            <TextInput
              s={12}
              l={12}
              m={12}
              xl={12}
              label="Select File"
              type="file"
              name="file"
              onChange={this.handleChange}
            />
          </Row>
          <Row>
            <Button
              node="button"
              className={edited ? "gradient-btn btn-primary" : ""}
              waves="green"
              disabled={!edited}
            >
              Submit
            </Button>
          </Row>
        </form>
        {loading && (
          <Row>
            <Loading />
          </Row>
        )}
        <Row>
          {this.state.successMessage && (
            <Row className="animated shake">
              <p className="green-text animated bounceOutLeft delay-3s">
                {this.state.successMessage}
              </p>
            </Row>
          )}
          {this.state.errorMessage && (
            <Row className="animated rubberBand">
              <p className="red-text animated bounceOutLeft delay-3s ">
                {this.state.errorMessage}
              </p>
            </Row>
          )}
        </Row>
      </div>
    );
  }
}

export default connect(mapStateToProps)(UploadForm);
