import React, { Component } from "react";
import { connect } from "react-redux";
import { Row, Button, Icon } from "react-materialize";
import StatusTable from "./StatusTable";
import API from "../../../utils/API/API";
import Loading from "../../loading/Loading";
import StatusModal from "./StatusModal";
function mapStateToProps(state) {
  return {};
}

class Status extends Component {

    state = {
        statuses: [],
        loading: true,
        openCreateModal: false
    }
    componentDidMount(){
       this.getStatuses()
    }

    getStatuses = () => {
        API.get(`/statuses`).then(response => {
            const statuses = response.data
            this.setState({
                loading: false,
                statuses
            })
        })
    }

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
      const {loading, statuses, openCreateModal} = this.state
      if(loading){
         return <Loading/>
      }
    return (
      <div>
        <Row style={{ marginTop: "20px" }}></Row>
        <h5>
          Statuses{" "}
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
            <StatusTable statuses={statuses}/>
        </Row>
        {openCreateModal && (
          <StatusModal closeModal={this.closeCreateModal} updateData={this.getStatuses} />
        )}
      </div>
    );
  }
}

export default connect(mapStateToProps)(Status);
