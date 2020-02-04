import React, { Component } from "react";
import { connect } from "react-redux";
import { Row, Col, Pagination, Icon } from "react-materialize";
import ProjectTableAdmin from "./ProjectTableAdmin";
import API from "../../../utils/API/API";
import Loading from "../../loading/Loading";
import ProjectFilter from "../../projects/ProjectFilter";
import Axios from "axios";
import ProjectFilterAdmin from "./ProjectFilterAdmin";

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
    this.getData(pageNo);
  }
  setPageNumber = pageNo => {
    this.setState({
      pageNo
    });
    this.getData(pageNo);
  };

  getData = pageNo => {
    if (!pageNo) {
      pageNo = this.state.pageNo;
    }
    const getStatusesRequest = API.get("/statuses");
    const getUsersRequest = API.get(`/admin/users`);
    const getProjectsRequest = API.get(`/projects?pageNo=${pageNo}`);
    Axios.all([getProjectsRequest, getStatusesRequest, getUsersRequest])
      .then(
        Axios.spread((...responses) => {
          const projects = responses[0].data.projects;
          const totalProjects = responses[0].data.count;
          const statuses = responses[1].data;
          const users = responses[2].data;
          this.setState({
            projects,
            totalProjects,
            statuses,
            users,
            loading: false
          });
        })
      )
      .catch(error => {
        this.setState({
          ...this.state,
          loading: false
        });
        console.log(error);
        this.props.history.push("/notfound");
      });
  };

  // getProjects = pageNo => {
  //   if(!pageNo) {
  //     pageNo = this.state.pageNo
  //   }
  //   API.get(`/projects?pageNo=${pageNo}`)
  //     .then(response => {
  //       this.setState({
  //         loading: false,
  //         projects: response.data.projects,
  //         totalProjects: response.data.count
  //       });
  //     })
  //     .catch(error => {
  //       this.props.history.push("/notfound");
  //     });
  // };

  //get the new data from ProjectFilter Component and display search result
  searchData = (newData, count) => {
    this.setState({
      projects: newData,
      totalProjects: count
    });
  };

  //Reset filter project
  resetFilter = e => {
    this.getData(1);
  };

  render() {
    const { loading, projects, pageNo, totalProjects, statuses, users } = this.state;
    if (loading) {
      return <Loading />;
    }
    return (
      <div>
        <Row style={{ marginTop: "20px" }}></Row>
        <Row>
          <Col>
            <h5>
              <Icon>assignment_turned_in</Icon>Project Contributors
            </h5>
          </Col>
        </Row>

        <ProjectFilterAdmin
          searchData={this.searchData}
          resetFilter={this.resetFilter}
          statuses = {statuses}
          users = {users}
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
          <ProjectTableAdmin
            projects={projects}
            updateData={this.getData}
          />
        </Row>
      </div>
    );
  }
}

export default connect(mapStateToProps)(ProjectContributors);
