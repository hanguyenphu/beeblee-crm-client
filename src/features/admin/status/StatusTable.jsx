import React, { Component } from "react";
import { connect } from "react-redux";
import { Table, Icon } from "react-materialize";
import StatusModal from "./StatusModal";
function mapStateToProps(state) {
  return {};
}

class StatusTable extends Component {
  state = {
    openModal: false,
    status: {},
    successMessage: "",
    errorMessage: ""
  };
  handleOpenModel = status => () => {
    this.setState({
      ...this.state,
      openModal: true,
      status
    });
  };

  closeModal = () => {
    this.setState({
      openModal: false
    });
  };

  displayStatus = () => {
    const { statuses } = this.props;
    return statuses.map(status => {
      return (
        <tr key={status._id}>
          <td>{status.title}</td>
          <td>
            <span
              style={{ backgroundColor: `${status.color}` }}
              className="dot"
            ></span>
          </td>
          <td>
            <a href="#" onClick={this.handleOpenModel(status)}>
              <Icon>edit</Icon>
            </a>
          </td>
        </tr>
      );
    });
  };
  render() {
      const {openModal, status} = this.state
    return (
      <div>
        <Table responsive={true} hoverable={true}>
          <thead>
            <tr>
              <th data-field="title">Title</th>
              <th data-field="color">Color</th>
              <th data-field="edit">Edit</th>
            </tr>
          </thead>
          <tbody>{this.displayStatus()}</tbody>
        </Table>
        {openModal && <StatusModal closeModal={this.closeModal} status={status}/>}
      </div>
    );
  }
}

export default connect(mapStateToProps)(StatusTable);
