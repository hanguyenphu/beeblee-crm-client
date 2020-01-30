import React, { Component } from "react";
import { connect } from "react-redux";
import { Table, Icon } from "react-materialize";
import CreateNewUserModal from "./CreateNewUserModal";
function mapStateToProps(state) {
  return {};
}

class UserTable extends Component {
  state = {
    openModal: false,
    loading: false
  };
  handleOpenModel =  (user) => () => {

    this.setState({
      ...this.state,
      openModal: true,
      user
    });
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
            {user.active.toString() ==="true" ? (
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
            </tr>
          </thead>
          <tbody>{this.displayUser()}</tbody>
        </Table>
        {openModal && <CreateNewUserModal  closeCreateModal={this.closeModal} user={user}/>}
      </div>
    );
  }
}

export default connect(mapStateToProps)(UserTable);
