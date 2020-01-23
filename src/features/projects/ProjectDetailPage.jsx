import React, { Component } from "react";
import { connect } from "react-redux";
import API from "../../utils/API/API";
import Loading from "../loading/Loading";
import ProjectForm from "./ProjectForm";
import { Row, Button, Icon, Tabs, Tab } from "react-materialize";
import ProjectAccounts from "./ProjectAccounts";

function mapStateToProps(state) {
  return {};
}

class ProjectDetailPage extends Component {
  state = {
    loading: true,
    project: {}
  };

  componentDidMount() {
    this.getProjectDetail();
  }

  getProjectDetail = () => {
    const projectId = this.props.match.params.id;
    API.get(`/projects/${projectId}`)
      .then(response => {
        this.setState({
          project: response.data,
          loading: false
        });
      })
      .catch(error => {
        this.setState({
          loading: false
        });
      });
  };

  handleGoBack = () => {
    this.props.history.goBack();
  };

  render() {
    const { project, loading } = this.state;
    if (loading) {
      return <Loading />;
    }

    return (
      <div>
        <Row style={{ marginTop: "20px" }}>
          <Button
            node="button"
            type="submit"
            waves="light"
            className="gradient-btn btn-white"
            onClick={this.handleGoBack}
          >
            Go Back
            <Icon left>arrow_back</Icon>
          </Button>
        </Row>
        {/* <h5>Project Detail</h5> */}
        <Row
          className=" radius-corner"
          style={{
            backgroundColor: "white",
            padding: "20px",
            boxShadow: "1px 1px 1px #9E9E9E"
          }}
        >
          <h4>Project Details</h4>
          <Tabs className="tab-demo z-depth-1 tabs-fixed-width">
            <Tab
              active
              options={{
                duration: 300,
                onShow: null,
                responsiveThreshold: Infinity,
                swipeable: false
              }}
              title="General Info"
            >
              <h5>General Info</h5>
              <ProjectForm project={project} />
            </Tab>
            <Tab
              options={{
                duration: 300,
                onShow: null,
                responsiveThreshold: Infinity,
                swipeable: false
              }}
              title="Accounts"
            >
              <Row>
                <h5>Accounts </h5>

              </Row>

              <ProjectAccounts accounts={project.accounts} projectId={project._id} getProjectDetail={this.getProjectDetail}/>
            </Tab>
            <Tab
              options={{
                duration: 300,
                onShow: null,
                responsiveThreshold: Infinity,
                swipeable: false
              }}
              title="Others"
            >
              <h5>Others</h5>
            </Tab>
            {/* <Tab
              options={{
                duration: 300,
                onShow: null,
                responsiveThreshold: Infinity,
                swipeable: false
              }}
              title="Test 4"
            >
              Test 4
            </Tab>
            <Tab
              options={{
                duration: 300,
                onShow: null,
                responsiveThreshold: Infinity,
                swipeable: false
              }}
              title="Test 4"
            >
              Test 5
            </Tab> */}
          </Tabs>
        </Row>
      </div>
    );
  }
}

export default connect(mapStateToProps)(ProjectDetailPage);
