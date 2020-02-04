import React, { Component } from "react";
import { connect } from "react-redux";
import { Row, Button, Icon } from "react-materialize";
import API from "../../../utils/API/API";
import ProvinceModal from "./ProvinceModal";
import Loading from "../../loading/Loading";
import ProvinceTable from "./ProvinceTable";

function mapStateToProps(state) {
  return {};
}

class Province extends Component {
  state = {
    provinces: [],
    loading: true,
    openCreateModal: false
  };
  componentDidMount() {
    this.getProvinces();
  }

  getProvinces = () => {
    API.get(`/provinces`).then(response => {
      const provinces = response.data;
      this.setState({
        loading: false,
        provinces
      });
    });
  };
  handleCreateModel = () => {
    this.setState({
      ...this.state,
      openCreateModal: true
    });
  };

  closeCreateModal = () => {
    this.setState({
      openCreateModal: false
    });
  };

  render() {
    const {loading, provinces, openCreateModal} = this.state
    if(loading){
       return <Loading/>
    }
    return (
      <div>
        <Row style={{ marginTop: "20px" }}></Row>{" "}
        <h5>
          Provinces{" "}
          <Button
            node="button"
            type="submit"
            waves="light"
            className="gradient-btn btn-red"
            onClick={this.handleCreateModel}
          >
            Add
            <Icon left>add_box</Icon>
          </Button>
        </h5>
        <Row
          className=" radius-corner"
          style={{
            backgroundColor: "white",
            padding: "20px",
            boxShadow: "1px 1px 1px #9E9E9E"
          }}
        >
          <ProvinceTable provinces={provinces} />
        </Row>
        {openCreateModal && (
          <ProvinceModal
            closeModal={this.closeCreateModal}
            updateData={this.getProvinces}
          />
        )}
      </div>
    );
  }
}

export default connect(mapStateToProps)(Province);
