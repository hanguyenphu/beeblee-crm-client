import React, { Component } from "react";
import { connect } from "react-redux";
import API from "../../utils/API/API";
import { Select } from "react-materialize";
import Loading from "../loading/Loading";

function mapStateToProps(state) {
  return {};
}

class CategoryDropdown extends Component {
  state = {
    loading: true
  };
  componentDidMount() {
    API.get("/categories")
      .then(response => {
        this.setState({
          ...this.state,
          categories: response.data,
          loading: false
        });
      })
      .catch(error => {
        this.setState({
          ...this.state,
          loading: false
        });
        console.log(error);
      });
  }
  render() {
    const { loading, categories } = this.state;
    if (loading) {
      return <Loading />;
    }
    return (
      <div>
        <Select
          s={12}
          l={6}
          m={6}
          xl={6}
          onChange={this.props.handleChangeProject}

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
          value={this.props.category? this.props.category._id: ""}
          name="category"
          required={this.props.required? true: false}
        >
          <option disabled value="">
            Choose category
          </option>
          {categories.map(category => {
            return (
              <option value={category._id} key={category._id}>
                {category.title}
              </option>
            );
          })}
        </Select>
      </div>
    );
  }
}

export default connect(mapStateToProps)(CategoryDropdown);
