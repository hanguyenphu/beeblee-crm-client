import React, { Component } from "react";
import { connect } from "react-redux";
import { Modal, Button, Row, TextInput } from "react-materialize";
import formatPhone from "../../utils/commons/FormatPhone";
import ProvinceDropdown from "../common/ProvinceDropdown";
import API from "../../utils/API/API";

function mapStateToProps(state) {
  return {};
}

//Take 2 props:
// Business object to display
//and updateData() function to update data in the parent component
//If Business object is empty, then create a new one
class BusinessForm extends Component {
  state = {
    business: { name: "", address: "", phone: "", province: "" },
    edited: false,
    successMessage: "",
    errorMessage: "",
    duplicatedBusinesses: []
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
    this.setState({
      business,
      edited: true
    });
  };

  //Create a business
  //Will be called when _id property of business is not present
  createBusinessAPI = business => {
    API.post(`businesses`, business)
      .then(response => {
        this.props.updateData();
        this.props.closeCreateModal();
      })
      .catch(error => {
        if (error.response) {
          this.setState({
            duplicatedBusinesses: error.response.data
          });
        }
      });
  };

  //Update business API
  //Will be called when business has _id property
  updateBusinessAPI = business => {
    const _id = business._id;
    const updateBusiness = {
      name: business.name,
      phone: business.phone,
      address: business.address,
      province: business.province
    };
    API.patch(`businesses/${_id}`, updateBusiness)
      .then(response => {
        //Update the data in the parent component
        this.props.updateData();
        this.setState({
          ...this.state,
          successMessage: "Save successfully!",
          errorMessage: "",
          loading: false,
          edited: false
        });
        this.props.closeCreateModal();
      })
      .catch(error => {
        this.setState({
          ...this.state,
          successMessage: "",
          errorMessage: "Cannot save the data!",
          loading: false,
          edited: false
        });
      });
  };

  handleSubmit = e => {
    e.preventDefault();
    let { business } = this.state;
    this.setState({
      ...this.state,
      successMessage: "",
      errorMessage: "",
      loading: true,
      edited: false
    });
    //Check _id propery to decide to create or update
    if (!business._id) {
      this.createBusinessAPI(business);
    } else {
      this.updateBusinessAPI(business);
    }
  };

  render() {
    const { business, edited, duplicatedBusinesses } = this.state;
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <Row className="">
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
            <ProvinceDropdown
              handleChange={this.handleChange}
              province={business.province}
            />
          </Row>
          <Row>
            <Button
              node="button"
              className={edited ? "gradient-btn btn-green" : ""}
              waves="green"
              disabled={!edited}
            >
              Save
            </Button>
          </Row>
        </form>
        {duplicatedBusinesses.length > 0 && (
          <Row>
            <p className="red-text animated bounceInLeft ">
              Duplicated Business Found!
            </p>
            {duplicatedBusinesses.map(business => {
              const href = `/businesses/${business._id}`;
              return (
                <Row className="animated shake" key={business._id}>
                  <a href={href} target="_blank">
                    {business.name}
                  </a>
                </Row>
              );
            })}
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

export default connect(mapStateToProps)(BusinessForm);
