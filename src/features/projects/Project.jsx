import React, { Component } from "react";
import { connect } from "react-redux";
import API from "../../utils/API/API";
import Loading from "../loading/Loading";
import ProjectTable from "./ProjectTable";
import { Row, Pagination, Icon, Col } from "react-materialize";
import ProjectFilter from "./ProjectFilter";
function mapStateToProps(state) {
  return {};
}

class Project extends Component {
  state = {
    loading: true,
    pageNo: 1,
    totalProjects: 0
  };
  componentDidMount() {
    const { pageNo } = this.state;
    this.getProjects(pageNo)
  }

  getProjects = pageNo => {
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
      totalProjects:count
    })
  }

  //Reset filter project
  resetFilter = e => {
    this.getProjects(1)
  }

  setPageNumber = pageNo => {
    this.setState({
      pageNo
    });
    this.getProjects(pageNo);
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
            <h5>All Projects</h5>
          </Col>
        </Row>

        <ProjectFilter searchData={this.searchData} resetFilter={this.resetFilter}/>
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
          <ProjectTable projects={projects} />
        </Row>
      </div>
    );
  }
}

export default connect(mapStateToProps)(Project);
