import React, { Component } from "react";
import { connect } from "react-redux";
import { Row, TextInput } from "react-materialize";
import Button from "react-materialize/lib/Button";
import StatusDropdown from "../common/StatusDropdown";
import CategoryDropdown from "../common/CategoryDropdown";
import API from "../../utils/API/API";
function mapStateToProps(state) {
  return {};
}

class ProjectFilter extends Component {
  state = {
    search: {
      name: "",
      status: "",
      category: ""
    },
    edited: false
  };

  handleSearch = e => {
    e.preventDefault();
    API.post('/search/projects', this.state.search).then(response => {
      if(response.data){

       this.props.searchData(response.data.projects, response.data.count)
      }
    }).catch(error => {
      console.log(error)
    })
    //console.log(this.state.search);
  };

  handleReset = e => {
    e.preventDefault()
    this.setState({
      search: {
        name: "",
        status: "",
        category: ""
      },
      edited: false
    })
    this.props.resetFilter()
  }
  handleChange = e => {
    const field = e.target.name;
    const value = e.target.value;
    let { search } = this.state;

    search[field] = value;
    this.setState({
      search,
      edited: true
    });
  };
  render() {
    const { search, edited } = this.state;
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
              s={12}
              l={6}
              m={6}
              xl={6}
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
              className= {edited? "gradient-btn btn-blue" : ""}
              node="button"
              disabled = {!edited}
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
              type="reset"
              style={{
                marginRight: "5px",
                bottom: "-20px",
                marginBottom: "20px"
              }}
              onClick={this.handleReset}
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
