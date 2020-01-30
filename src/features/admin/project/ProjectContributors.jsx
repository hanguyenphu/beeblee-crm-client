import React, { Component } from "react";
import { connect } from "react-redux";
import { Row, Col, Pagination, Icon } from "react-materialize";
import ProjectTableAdmin from "./ProjectTableAdmin";
import API from "../../../utils/API/API";
import Loading from "../../loading/Loading";
import ProjectFilter from "../../projects/ProjectFilter";

function mapStateToProps(state) {
  return {};
}

class ProjectContributors extends Component {
  state = {
    loading: true,
    pageNo: 1,
    totalProjects: 0
  };
  componentDidMount() {
    const { pageNo } = this.state;
    this.getProjects(pageNo);
  }
  setPageNumber = pageNo => {
    this.setState({
      pageNo
    });
    this.getProjects(pageNo);
  };

  getProjects = pageNo => {
    if(!pageNo) {
      pageNo = this.state.pageNo
    }
    API.get(`/projects?pageNo=${pageNo}`)
      .then(response => {
        this.setState({
          loading: false,
          projects: response.data.projects,
          totalProjects: response.data.count
        });
      })
      .catch(error => {
        this.props.history.push("/notfound");
      });
  };

  //get the new data from ProjectFilter Component and display search result
  searchData = (newData, count) => {
    this.setState({
      projects: newData,
      totalProjects: count
    });
  };

  //Reset filter project
  resetFilter = e => {

    this.getProjects(1);
  };


  render() {
    const { loading, projects, pageNo, totalProjects } = this.state;
    if (loading) {
      return <Loading />;
    }
    return (
      <div>
        <Row style={{ marginTop: "20px" }}></Row>
        <Row>
          <Col>
            <h5>Project Contributors</h5>
          </Col>
        </Row>

        <ProjectFilter
          searchData={this.searchData}
          resetFilter={this.resetFilter}
        />

        <Row
          className=" radius-corner"
          style={{
            backgroundColor: "white",
            padding: "20px",
            boxShadow: "1px 1px 1px #9E9E9E"
          }}
        >
          <Row style={{ textAlign: "center" }}>
            <Pagination
              activePage={pageNo}
              items={totalProjects / 10 + 1}
              leftBtn={<Icon>chevron_left</Icon>}
              maxButtons={3}
              rightBtn={<Icon>chevron_right</Icon>}
              onSelect={pageNumber => {
                this.setPageNumber(pageNumber);
              }}
            />
          </Row>
          <ProjectTableAdmin projects={projects} updateData={this.getProjects}/>
        </Row>
      </div>
    );
  }
}

export default connect(mapStateToProps)(ProjectContributors);
