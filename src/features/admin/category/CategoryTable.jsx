import React, { Component } from "react";
import { connect } from "react-redux";
import { Table, Icon } from "react-materialize";
import CategoryModal from "./CategoryModal";

function mapStateToProps(state) {
  return {};
}

class CategoryTable extends Component {
  state = {
    openModal: false,
    category: {}
  };
  handleOpenModel = category => () => {
    this.setState({
      ...this.state,
      openModal: true,
      category
    });
  };

  closeModal = () => {
    this.setState({
      openModal: false
    });
  };
  displayCategory = () => {
    const { categories } = this.props;
    return categories.map(category => {
      return (
        <tr key={category._id}>
          <td>{category.title}</td>
          <td>{category.order}</td>
          <td>
            {category.active.toString() === "true" ? (
              <span className="dot active"></span>
            ) : (
              <span className="dot inactive"></span>
            )}
          </td>
          <td>
            <a href="#" onClick={this.handleOpenModel(category)}>
              <Icon>edit</Icon>
            </a>
          </td>
        </tr>
      );
    });
  };
  render() {
    const { openModal, category } = this.state;
    return (
      <div>
        <Table responsive={true} hoverable={true}>
          <thead>
            <tr>
              <th data-field="title">Title</th>
              <th data-field="order">Order</th>
              <th data-field="active">Active</th>
              <th data-field="edit">Edit</th>
            </tr>
          </thead>
          <tbody>{this.displayCategory()}</tbody>
        </Table>
        {openModal && (
          <CategoryModal closeModal={this.closeModal} category={category} />
        )}
      </div>
    );
  }
}

export default connect(mapStateToProps)(CategoryTable);
