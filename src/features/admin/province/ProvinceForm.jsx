import React, { Component } from "react";
import { connect } from "react-redux";
import { TextInput, Button, Row, Select } from "react-materialize";
import API from "../../../utils/API/API";

function mapStateToProps(state) {
  return {};
}

class ProvinceForm extends Component {
  state = {
    province: {
      name: "",
      gst: { $numberDecimal: 0.00 },
      pst: { $numberDecimal: 0.00 },
      hst: { $numberDecimal: 0.00 },
      order: "",
      active: true
    },
    edited: false
  };
  componentDidMount() {
    let { province } = this.props;
    if (province) {
      this.setState({
        province
      });
    }
  }

  createProvince = province => {
    API.post(`/provinces`, province)
      .then(response => {
        if (response.data) {
          this.setState({
            successMessage: "Province was created",
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

  updateProvince = province => {
    API.patch(`/provinces/${province._id}`, province)
      .then(response => {
        if (response.data) {
          this.setState({
            successMessage: "Province was updated",
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
    const { province } = this.state;
    if (province._id) {
      this.updateProvince(province);
    } else {
      this.createProvince(province);
      this.props.updateData();
    }
  };

  handleChange = e => {
    const field = e.target.name;
    const value = e.target.value;
    let { province } = this.state;

    if (field === "gst" || field === "pst" || field === "hst") {
      province[field]["$numberDecimal"] = value;
    } else {
        province[field] = value;
    }

    this.setState({
      province,
      edited: true
    });
  };

  render() {
    const { province, edited } = this.state;
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <Row>
            <TextInput
              s={12}
              m={6}
              xl={6}
              l={6}
              label="Name:"
              name="name"
              value={province.name}
              onChange={this.handleChange}
            />
            <TextInput
              s={12}
              m={6}
              xl={6}
              l={6}
              label="GST:"
              name="gst"
              value={province.gst.$numberDecimal.toString()}
              onChange={this.handleChange}
            />
            <TextInput
              s={12}
              m={6}
              xl={6}
              l={6}
              label="PST:"
              name="pst"
              value={province.pst.$numberDecimal.toString()}
              onChange={this.handleChange}
            />
            <TextInput
              s={12}
              m={6}
              xl={6}
              l={6}
              label="HST:"
              name="hst"
              value={province.hst.$numberDecimal.toString()}
              onChange={this.handleChange}
            />

            <TextInput
              s={12}
              m={6}
              xl={6}
              l={6}
              label="Order:"
              name="order"
              value={province.order.toString()}
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
              value={province.active.toString()}
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

export default connect(mapStateToProps)(ProvinceForm);
