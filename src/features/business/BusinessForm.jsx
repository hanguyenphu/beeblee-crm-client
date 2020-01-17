import React, { Component } from "react";
import { connect } from "react-redux";
import { Modal, Button, Row, TextInput } from "react-materialize";
import formatPhone from "../../utils/commons/FormatPhone";
import ProvinceDropdown from "../common/ProvinceDropdown";
import API from "../../utils/API/API";

function mapStateToProps(state) {
  return {};
}

class BusinessForm extends Component {
  state = {
    business: { name: "", address: "", phone: "", province: "" }
  };

  componentDidMount() {
    if (this.props.business) {
      this.setState({
        business: this.props.business
      });
    }
  }

  handleChange = e => {
    const field = e.target.name;
    let value = e.target.value;

    if (field === "phone") {
      value = formatPhone(value);
    }

    let business = this.state.business;
    business[field] = value;
    this.setState( business);
  };

  handleSubmit = e => {
    e.preventDefault();
    let { business } = this.state;

    if (!business._id) {
      API.post(`businesses`, business)
        .then(response => {
          this.props.updateData();
          this.props.closeCreateModal();
        })
        .catch(error => {
          console.log(error);
        });
    } else {
      const _id = business._id
      const updateBusiness = {
        name: business.name,
        phone: business.phone,
        address: business.address,
        province: business.province
      }

      API.patch(`businesses/${_id}`, updateBusiness)
      .then(response => {
        //Update the data in the parent component
        this.props.updateData();
        this.setState({
          ...this.state,
          successMessage: "Save successfully!",
          loading: false
        });
      })
      .catch(error => {
        this.setState({
          errorMessage: "Cannot save the data!",
          loading: false
        });
      });
    }
  };

  render() {
    const { business } = this.state;
    return (

          <form onSubmit={this.handleSubmit}>
            <Row>
              <TextInput
                s={12}
                l={6}
                m={6}
                xl={6}
                label="Name:"
                name="name"
                value={business.name}
                onChange={this.handleChange}
                required
              />
              <TextInput
                s={12}
                l={6}
                m={6}
                xl={6}
                label="Address"
                name="address"
                value={business.address}
                onChange={this.handleChange}
                required
              />
              <TextInput
                s={12}
                l={6}
                m={6}
                xl={6}
                label="Phone:"
                name="phone"
                value={business.phone}
                onChange={this.handleChange}
                required
              />
              <ProvinceDropdown handleChange={this.handleChange} province={business.province} />
            </Row>
            <Row>
              <Button
                node="button"
                className="gradient-btn btn-primary"
                waves="green"
              >
                Save
              </Button>
            </Row>
          </form>


    );
  }
}

export default connect(mapStateToProps)(BusinessForm);
