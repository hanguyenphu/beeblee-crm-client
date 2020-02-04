import React, { Component } from "react";
import { connect } from "react-redux";
import { TextInput, Button, Row, Select } from "react-materialize";
import API from "../../../utils/API/API";
function mapStateToProps(state) {
  return {};
}

class CategoryForm extends Component {
  state = {
    category: {
      title: "",
      description: "",
      order: "",
      active: true
    },
    edited: false
  };
  componentDidMount() {
    const { category } = this.props;
    if (category) {
      this.setState({
        category
      });
    }
  }

  createCategory = category => {
    API.post(`/categories`, category)
      .then(response => {
        if (response.data) {
          this.setState({
            successMessage: "Category was created",
            errorMessage: "",
            edited: false
          });
        }
      })
      .catch(error => {
        this.setState({
          successMessage: "",
          errorMessage: "An Error has been occurred",
          edited: false
        });
      });
  };

  updateCategory = category => {
    API.patch(`/categories/${category._id}`, category)
      .then(response => {
        if (response.data) {
          this.setState({
            successMessage: "Category was updated",
            errorMessage: "",
            edited: false
          });
        }
      })
      .catch(error => {
        this.setState({
          successMessage: "",
          errorMessage: "An Error has been occurred",
          edited: false
        });
      });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { category } = this.state;
    if (category._id) {
      this.updateCategory(category);

    } else {
      this.createCategory(category);
      this.props.updateData();
    }
  };

  handleChange = e => {
    const field = e.target.name;
    const value = e.target.value;
    let { category } = this.state;
    category[field] = value;
    this.setState({
      category,
      edited: true
    });
  };

  render() {
    const { category, edited } = this.state;
    return (
      <div>
        {" "}
        <form onSubmit={this.handleSubmit}>
          <Row>
            <TextInput
              s={12}
              m={6}
              xl={6}
              l={6}
              label="Title:"
              name="title"
              value={category.title}
              onChange={this.handleChange}
            />
            <TextInput
              s={12}
              m={6}
              xl={6}
              l={6}
              label="Description:"
              name="description"
              value={category.description}
              onChange={this.handleChange}
            />
            <TextInput
              s={12}
              m={6}
              xl={6}
              l={6}
              label="Order:"
              name="order"
              value={category.order.toString()}
              onChange={this.handleChange}
            />

            <Select
              s={12}
              m={6}
              xl={6}
              l={6}
              label="Active"
              name="active"
              onChange={this.handleChange}
              options={{
                classes: "",
                dropdownOptions: {
                  alignment: "left",
                  autoTrigger: true,
                  closeOnClick: true,
                  constrainWidth: true,
                  container: null,
                  coverTrigger: true,
                  hover: false,
                  inDuration: 150,
                  onCloseEnd: null,
                  onCloseStart: null,
                  onOpenEnd: null,
                  onOpenStart: null,
                  outDuration: 250
                }
              }}
              value={category.active.toString()}
              required
            >
              <option value="true">Active</option>
              <option value="false">Inactive</option>
            </Select>
          </Row>
          <Row>
            <Button
              disabled={!edited}
              className={edited ? "gradient-btn btn-green" : ""}
            >
              Save
            </Button>
          </Row>
        </form>
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

export default connect(mapStateToProps)(CategoryForm);
