import React, { Component } from "react";
import { connect } from "react-redux";
import { Modal, Button, Row, TextInput, Select } from "react-materialize";
import Loading from "../loading/Loading";

import ContactForm from "../contact/ContactForm";
import { ContactTable } from "../contact/ContactTable";
import API from "../../utils/API/API";
import formatPhone from "../../utils/commons/FormatPhone";
import ProvinceDropdown from "../common/ProvinceDropdown";



class BusinessModalDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      edited: false
    };
  }

  componentDidMount() {
    this.setState({
      business: this.props.business
    });
    this.getBusinessDetail(this.props.business._id);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.business._id !== this.props.business._id) {
      this.getBusinessDetail(this.props.business._id);
      this.setState({
        business: this.props.business,
        errorMessage: "",
        successMessage: "",
        edited: false
      });
    }
  }

  getBusinessDetail(id) {
    this.setState({
      ...this.state,
      loading: true
    });
    API.get(`businesses/${id}`)
      .then(response => {
        if (response.data.business) {
          this.setState({
            ...this.state,
            contacts: response.data.business.contacts,
            province: response.data.business.province,
            loading: false
          });
        }
      })
      .catch(err => {
        this.setState({
          loading: false,
          errorMessage: "Could not fetch the data"
        });
      });
  }

  handleChangeBusiness = e => {
    const field = e.target.name;
    let value = e.target.value;
    if (field === "phone") {
      value = formatPhone(value);
    }
    let business = this.state.business;
    business[field] = value;
    this.setState({
      ...this.state,
      business,
      edited: true
    });
  };

  updateBusiness = e => {
    e.preventDefault();
    const _id = this.state.business._id;
    const business = {
      name: this.state.business.name,
      phone: this.state.business.phone,
      address: this.state.business.address,
      province: this.state.business.province
    };
    this.setState({
      errorMessage: "",
      successMessage: "",
      loading: true,
      edited: false
    });

    API.patch(`businesses/${_id}`, business)
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
  };

  addMoreContactToTable = contact => {
    let contacts = this.state.contacts;
    contacts.push(contact);
    this.setState({
      ...this.state,
      contacts
    });
  };

  render() {
    const contacts = this.state.contacts || [];
    if (!this.state.business) {
      return <Loading />;
    }
    const { business, edited } = this.state;
    return (
      <Modal
        actions={[
          <Button flat modal="close" node="button" waves="green">
            Close
          </Button>
        ]}
        open={true}
        style={{ boder: "none" }}
        bottomSheet={false}
        fixedFooter={true}
        header="Business Detail"
        id="modal1"
        required
        options={{
          dismissible: true,
          endingTop: "10%",
          inDuration: 250,
          onCloseEnd: null,
          onCloseStart: null,
          onOpenEnd: null,
          onOpenStart: null,
          opacity: 0.5,
          outDuration: 250,
          preventScrolling: true,
          startingTop: "4%"
        }}
      >
        {!this.state.loading ? (
          <div>
            <form onSubmit={this.updateBusiness} >



              <Row >
                <TextInput
                  s={12}
                  l={6}
                  m={6}
                  xl={6}
                  label="Name:"
                  value={business.name}
                  name="name"
                  onChange={this.handleChangeBusiness}
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
                  onChange={this.handleChangeBusiness}
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
                  onChange={this.handleChangeBusiness}
                  required
                />
                <ProvinceDropdown
                  handleChange={this.handleChangeBusiness}
                  province={business.province}
                />
              </Row>

              <Row>
                <Button
                  node="button"
                  className={edited ? "gradient-btn btn-primary " : ""}
                  waves="green"
                  disabled={!edited}
                >
                  Update
                </Button>
              </Row>
            </form>
            {this.state.successMessage && (
              <Row className='animated shake'>
                <p className="green-text animated bounceOutLeft delay-3s">
                  {this.state.successMessage}
                </p>
              </Row>
            )}
            {this.state.errorMessage && (
              <Row className='animated rubberBand'>
                <p className="red-text animated bounceOutLeft delay-3s ">
                  {this.state.errorMessage}
                </p>
              </Row>
            )}

            <Row >
              <h5>Contacts </h5>
              <ContactForm
                business={business}
                addMoreContactToTable={this.addMoreContactToTable}
              />
            </Row>
            <ContactTable contacts={contacts} business={business} />
          </div>
        ) : (
          <Loading />
        )}
      </Modal>
    );
  }
}

const mapStateToProps = state => {
  return { provinces: state.provinces };
};

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BusinessModalDetail);
