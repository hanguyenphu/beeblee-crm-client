import React, { Component } from "react";
import { connect } from "react-redux";
import { Modal, Button, Row, TextInput } from "react-materialize";
import formatPhone from "../../utils/commons/FormatPhone";
import ProvinceDropdown from "../common/ProvinceDropdown";
import API from "../../utils/API/API";
import BusinessForm from './BusinessForm'
function mapStateToProps(state) {
  return {};
}

class CreateBusinessModal extends Component {
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
    const { business } = this.state;
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

      API.patch(`businesses/${business._id}`, business)
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
          <BusinessForm updateData={this.props.updateData} closeCreateModal={this.props.closeCreateModal}/>
        </Modal>
      </div>
    );
  }
}

export default connect(mapStateToProps)(CreateBusinessModal);
