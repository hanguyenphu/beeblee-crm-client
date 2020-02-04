import React, { Component } from "react";
import { connect } from "react-redux";
import { Table, Icon } from "react-materialize";
import ProvinceModal from "./ProvinceModal";
function mapStateToProps(state) {
  return {};
}

class ProvinceTable extends Component {
  state = {
    openModal: false,
    province: {},
    successMessage: "",
    errorMessage: ""
  };
  handleOpenModel = province => () => {
    this.setState({
      ...this.state,
      openModal: true,
      province
    });
  };

  closeModal = () => {
    this.setState({
      openModal: false
    });
  };

  displayProvince = () => {
    const { provinces } = this.props;
    return provinces.map(province => {
      return (
        <tr key={province._id}>
          <td>{province.name}</td>
          <td>{province.gst.$numberDecimal}</td>
          <td>{province.pst.$numberDecimal}</td>
          <td>{province.hst.$numberDecimal}</td>
          <td>{province.order}</td>
          <td>
            {province.active.toString() === "true" ? (
              <span className="dot active"></span>
            ) : (
              <span className="dot inactive"></span>
            )}
          </td>
          <td>
            <a href="#" onClick={this.handleOpenModel(province)}>
              <Icon>edit</Icon>
            </a>
          </td>
        </tr>
      );
    });
  };
  render() {
    const { openModal, province } = this.state;
    return (
      <div>
        <Table responsive={true} hoverable={true}>
          <thead>
            <tr>
              <th data-field="name">Name</th>
              <th data-field="Gst">Gst</th>
              <th data-field="Pst">Pst</th>
              <th data-field="Pst">Pst</th>
              <th data-field="order">Order</th>
              <th data-field="active">Active</th>
              <th data-field="edit">Edit</th>
            </tr>
          </thead>
          <tbody>{this.displayProvince()}</tbody>
        </Table>
        {openModal && (
          <ProvinceModal closeModal={this.closeModal} province={province} />
        )}
      </div>
    );
  }
}

export default connect(mapStateToProps)(ProvinceTable);
