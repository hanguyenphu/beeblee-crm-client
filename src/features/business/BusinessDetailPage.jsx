import React, { Component } from "react";
import { connect } from "react-redux";
import API from "../../utils/API/API";
import Loading from "../loading/Loading";
import { Row, Button, Icon } from "react-materialize";
import CreateProjectModal from "../projects/CreateProjectModal";
import ProjectTable from "../projects/ProjectTable";

function mapStateToProps(state, ownProps) {
  return {};
}

class BusinessDetailPage extends Component {
  state = {
    loading: true,
    errorMessage: "",
    business: {},
    openCreateProjectModal: false,
    projects: []
  };


  updateData = () => {};

  getBusinessData = () => {
    const businessId = this.props.match.params.id;
    API.get(`/businesses/${businessId}`).then(response => {
      const projects = response.data.business.projects;
      this.setState({
        ...this.state,
        projects,
        business: response.data.business,
        loading: false
      })
    }).catch(error => {
      this.props.history.push("/businesses")
    })
  }

  componentDidMount() {
    if (this.props.match.params.id) {
      this.getBusinessData()
    }
  }


  handleOpenCreateProjectModel = () => {
    this.setState({
      ...this.state,
      openCreateProjectModal: true
    });
  };

  closeCreateProjectModal = () => {
    this.setState({
      ...this.state,
      openCreateProjectModal: false
    });
  };





  handleGoBack = () => {
    this.props.history.push('/businesses')
  }
  render() {
    const { loading } = this.state;

    if (loading) {
      return <Loading />;
    }
    const { business, openCreateProjectModal, projects } = this.state;


    return (
      <div>
        <Row style={{ marginTop: "20px" }}>
          <Button node="button" type="submit" waves="light" className="gradient-btn btn-white" onClick={this.handleGoBack}>
            Go Back
            <Icon left>arrow_back</Icon>
          </Button>
        </Row>
        <Row>
          <h5>
            {business.name}{" "}
            <Button
              node="button"
              type="submit"
              waves="light"
              className="gradient-btn btn-red"
              onClick={this.handleOpenCreateProjectModel}
            >
              Create New Project
              <Icon left>add_box</Icon>
            </Button>
          </h5>
        </Row>

        <Row
          className=" radius-corner"
          style={{
            backgroundColor: "white",
            padding: "20px",
            boxShadow: "1px 1px 1px #9E9E9E"
          }}
        >
          {projects && <ProjectTable business={business} projects={projects} />}
        </Row>

        {openCreateProjectModal && (
          <CreateProjectModal
            closeCreateProjectModal={this.closeCreateProjectModal}
            business={business}
            getBusinessData={this.getBusinessData}
          />
        )}
      </div>
    );
  }
}

export default connect(mapStateToProps)(BusinessDetailPage);
