import React, { Component } from "react";
import { connect } from "react-redux";
import { Table, Icon, Button, Row } from "react-materialize";
import CreateNewUserModal from "./CreateNewUserModal";
import API from "../../../utils/API/API";
function mapStateToProps(state) {
  return {};
}

class UserTable extends Component {
  state = {
    openModal: false,
    loading: false,
    successMessage: "",
    errorMessage: ""
  };
  handleOpenModel = user => () => {
    this.setState({
      ...this.state,
      openModal: true,
      user
    });
  };

  handleResetPassword = user => () => {
    if (window.confirm(`Reset Password for ${user.name}?`)) {
      API.patch("/users/resetpassword", { userId: user._id })
        .then(response => {
          console.log(response.data);
          this.setState({
            successMessage: "Password reset!",
            errorMessage: ""
          });
        })
        .catch(error => {
          this.setState({
            successMessage: "",
            errorMessage: "Cannot Reset Password"
          });
        });
    }
  };

  closeModal = () => {
    this.setState({
      openModal: false
    });
  };
  displayUser = () => {
    const { users } = this.props;

    return users.map(user => {
      return (
        <tr key={user._id}>
          <td>{user.name}</td>
          <td>{user.email}</td>
          <td>{user.role}</td>
          <td>
            {user.active.toString() === "true" ? (
              <span className="dot active"></span>
            ) : (
              <span className="dot inactive"></span>
            )}
          </td>
          <td>
            <a href="#" onClick={this.handleOpenModel(user)}>
              <Icon>edit</Icon>
            </a>
          </td>
          <td>
            <Button
              className="gradient-btn btn-green"
              onClick={this.handleResetPassword(user)}
            >
              <Icon>vpn_key</Icon>
            </Button>
          </td>
        </tr>
      );
    });
  };
  render() {
    const { loading, openModal, user } = this.state;
    return (
      <div>
        <Table hoverable={true} responsive={true}>
          <thead>
            <tr>
              <th data-field="name">Name</th>
              <th data-field="email">Email</th>
              <th data-field="role">Role</th>
              <th data-field="active">Active</th>
              <th data-field="edit">Edit</th>
              <th data-field="edit">Reset Password</th>
            </tr>
          </thead>
          <tbody>{this.displayUser()}</tbody>
        </Table>
        {openModal && (
          <CreateNewUserModal closeCreateModal={this.closeModal} user={user} />
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

export default connect(mapStateToProps)(UserTable);
