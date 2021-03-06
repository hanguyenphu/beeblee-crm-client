import React, { Component } from "react";
import { connect } from "react-redux";
import { TextInput, Button, Row, Select } from "react-materialize";
import API from "../../../utils/API/API";

function mapStateToProps(state) {
  return {};
}

class StatusForm extends Component {
  state = {
    status: {
      title: "",
      color: "",
      order: "",
      active: true
    },
    edited: false
  };
  componentDidMount() {
    const { status } = this.props;
    if (status) {
      this.setState({
        status
      });
    }
  }

  createStatus = status => {
    API.post(`/statuses`, status)
      .then(response => {
        if (response.data) {
          this.setState({
            successMessage: "Status was created",
            errorMessage: "",
            edited: false
          });
        }
      })
      .catch(error => {
        this.setState({
          successMessage: "",
          errorMessage: "An Error has been occurred",
          edited: false
        });
      });
  };
  updateStatus = status => {
    API.patch(`/statuses/${status._id}`, status)
      .then(response => {
        if (response.data) {
          this.setState({
            successMessage: "Status was updated",
            errorMessage: "",
            edited: false
          });
        }
      })
      .catch(error => {
        this.setState({
          successMessage: "",
          errorMessage: "An Error has been occurred",
          edited: false
        });
      });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { status } = this.state;
    if (status._id) {
      this.updateStatus(status);
    } else {
      this.createStatus(status);
      this.props.updateData();
    }
  };

  handleChange = e => {
    const field = e.target.name;
    const value = e.target.value;
    let { status } = this.state;
    status[field] = value;
    this.setState({
      status,
      edited: true
    });
  };
  render() {
    const { status, edited } = this.state;

    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <Row>
            <TextInput
              s={12}
              m={6}
              xl={6}
              l={6}
              label="Title:"
              name="title"
              value={status.title}
              onChange={this.handleChange}
            />
            <TextInput
              s={12}
              m={6}
              xl={6}
              l={6}
              label="Color:"
              name="color"
              value={status.color}
              onChange={this.handleChange}
            />
            <TextInput
              s={12}
              m={6}
              xl={6}
              l={6}
              label="Order:"
              name="order"
              value={status.order.toString()}
              onChange={this.handleChange}
            />

            <Select
              s={12}
              m={6}
              xl={6}
              l={6}
              label="Active"
              name="active"
              onChange={this.handleChange}
              options={{
                classes: "",
                dropdownOptions: {
                  alignment: "left",
                  autoTrigger: true,
                  closeOnClick: true,
                  constrainWidth: true,
                  container: null,
                  coverTrigger: true,
                  hover: false,
                  inDuration: 150,
                  onCloseEnd: null,
                  onCloseStart: null,
                  onOpenEnd: null,
                  onOpenStart: null,
                  outDuration: 250
                }
              }}
              value={status.active.toString()}
              required
            >
              <option value="true">Active</option>
              <option value="false">Inactive</option>
            </Select>
          </Row>
          <Row>
            <Button
              disabled={!edited}
              className={edited ? "gradient-btn btn-green" : ""}
            >
              Save
            </Button>
          </Row>
        </form>
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

export default connect(mapStateToProps)(StatusForm);
