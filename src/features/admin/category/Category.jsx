import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Row, Icon } from "react-materialize";
import API from "../../../utils/API/API";
import Loading from "../../loading/Loading";
import CategoryModal from "./CategoryModal";
import CategoryTable from "./CategoryTable";
function mapStateToProps(state) {
  return {};
}

class Category extends Component {
  state = {
    categories: [],
    loading: true,
    openCreateModal: false
  };

  componentDidMount() {
    this.getCategories();
  }

  handleCreateModel = () => {
    this.setState({
      ...this.state,
      openCreateModal: true
    });
  };

  getCategories = () => {
    API.get(`/categories`).then(response => {
      const categories = response.data;
      this.setState({
        loading: false,
        categories
      });
    });
  };

  closeCreateModal = () => {
    this.setState({
      openCreateModal: false
    });
  };
  render() {
    const { loading, categories, openCreateModal } = this.state;
    if (loading) {
      return <Loading />;
    }
    return (
      <div>
        <Row style={{ marginTop: "20px" }}></Row>
        <h5>
          Categories{" "}
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
          <CategoryTable categories={categories}   updateData={this.getCategories}/>
        </Row>
        {openCreateModal && (
          <CategoryModal
            closeModal={this.closeCreateModal}
            updateData={this.getCategories}
          />
        )}
      </div>
    );
  }
}

export default connect(mapStateToProps)(Category);
