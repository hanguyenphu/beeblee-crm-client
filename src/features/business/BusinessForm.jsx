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
  handleChange = e => {
    const field = e.target.name;
    let value = e.target.value;

    if (field === "phone") {
      value = formatPhone(value);
    }

    let business = this.state.business;
    business[field] = value;
    this.setState(business);
  };

  handleSubmit = (e) => {
      e.preventDefault()
      const {business} = this.state
      API.post(`businesses`, business).then(response => {
          this.props.updateData()
          this.props.closeCreateModal()
      }).catch(error => {
          console.log(error)
      })
  }

  render() {
    const { business } = this.state;

    return (
      <div>
        <Modal
          actions={[
            <Button flat modal="close" node="button" waves="green">
              Close
            </Button>
          ]}
          bottomSheet={false}
          fixedFooter={false}
          header="Create a new business"
          id="modal-1"
          open={true}
          options={{
            dismissible: true,
            endingTop: "10%",
            inDuration: 250,
            onCloseEnd: this.props.closeCreateModal,
            onCloseStart: null,
            onOpenEnd: null,
            onOpenStart: null,
            opacity: 0.5,
            outDuration: 250,
            preventScrolling: true,
            startingTop: "4%"
          }}
        >
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
              <ProvinceDropdown handleChange={this.handleChange} />
            </Row>
            <Row>
              <Button
                node="button"
                className="gradient-btn btn-primary"
                waves="green"
              >
                Create
              </Button>
            </Row>
          </form>
        </Modal>
      </div>
    );
  }
}

export default connect(mapStateToProps)(BusinessForm);
