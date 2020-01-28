import React, { Component } from "react";
import { connect } from "react-redux";
import { Row, TextInput } from "react-materialize";
import Button from "react-materialize/lib/Button";
import StatusDropdown from "../common/StatusDropdown";
import CategoryDropdown from "../common/CategoryDropdown";
function mapStateToProps(state) {
  return {};
}

class ProjectFilter extends Component {
  state = {
    search: {
      name: "",
      status: "",
      category: ""
    }
  };

  handleSearch = e => {
    e.preventDefault();
    console.log(this.state.search);
  };
  handleChange = e => {
    const field = e.target.name;
    const value = e.target.value;
    let { search } = this.state;

    search[field] = value;
    this.setState({
      search
    });
  };
  render() {
    const { search } = this.state;
    return (
      <div>
        <form onSubmit={this.handleSearch}>
          <Row
            className=" radius-corner"
            style={{
              backgroundColor: "white",
              padding: "20px",
              boxShadow: "1px 1px 1px #9E9E9E"
            }}
          >
            <h6>Filter by</h6>
            <TextInput
              label="Project Name:"
              value={search.name}
              name="name"
              onChange={this.handleChange}
            />
            <StatusDropdown
              handleChangeProject={this.handleChange}
              s={12}
              l={6}
              m={6}
              xl={6}
              status={search.status}
              onChange={this.handleChange}
            />
            <CategoryDropdown
              handleChangeProject={this.handleChange}
              s={12}
              l={6}
              m={6}
              xl={6}
            />
            <Button
              type="submit"
              className="gradient-btn btn-blue"
              node="button"
              style={{
                marginRight: "5px",
                bottom: "-20px",
                marginBottom: "20px"
              }}
            >
              Search
            </Button>
            <Button
              className="gradient-btn btn-white"
              node="button"
              style={{
                marginRight: "5px",
                bottom: "-20px",
                marginBottom: "20px"
              }}
            >
              Reset
            </Button>
          </Row>
        </form>
      </div>
    );
  }
}

export default connect(mapStateToProps)(ProjectFilter);
