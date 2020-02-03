import React, { Component } from "react";
import { connect } from "react-redux";
import API from "../../../utils/API/API";
import UserTable from "./UserTable";
import { Row, Button, Icon } from "react-materialize";
import Loading from "../../loading/Loading";
import Modal from "react-materialize/lib/Modal";
import CreateNewUserModal from "./CreateNewUserModal";
function mapStateToProps(state) {
  return {};
}

class User extends Component {
  state = {
    users: [],
    loading: true,
    openCreateModal: false
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

  componentDidMount() {
    this.getUsers();
  }

  getUsers = () => {
    API.get(`/admin/users`)
      .then(response => {
        this.setState({
          users: response.data,
          loading: false
        });
      })
      .catch(error => {
        this.setState({
          loading: true
        });
        this.props.history.push("/notfound");
      });
  };
  render() {
    const { users, loading, openCreateModal } = this.state;
    if (loading) {
      return <Loading />;
    }
    return (
      <div>
        <Row style={{ marginTop: "20px" }}></Row>
        <h5>
          <Icon>group</Icon> Users{" "}
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
          <UserTable users={users} />
        </Row>
        {openCreateModal && (
          <CreateNewUserModal closeCreateModal={this.closeCreateModal} updateData={this.getUsers} />
        )}
      </div>
    );
  }
}

export default connect(mapStateToProps)(User);
