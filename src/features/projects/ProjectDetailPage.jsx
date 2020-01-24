import React, { Component } from "react";
import { connect } from "react-redux";
import API from "../../utils/API/API";
import Loading from "../loading/Loading";
import ProjectForm from "./ProjectForm";
import { Row, Button, Icon, Tabs, Tab } from "react-materialize";
import ProjectAccounts from "./ProjectAccounts";
import { ContactTable } from "../contact/ContactTable";
import ContactForm from "../contact/ContactForm";
import UploadTable from "../upload/UploadTable";
import UploadModal from "../upload/UploadModal";

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
    //get the project detail first
    API.get(`/projects/${projectId}`)
      .then(response => {
        const project = response.data;
        const businessId = response.data.business._id;
        // then get the business contacts
        API.get(`/businesses/${businessId}`).then(response2 => {
          const business = response2.data.business;
          const contacts = business.contacts;
          this.setState({
            contacts,
            business,
            project,
            loading: false
          });
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

  addMoreContactToTable = contact => {
    let contacts = this.state.contacts;
    if (!contacts.some( e => e._id == contact._id)) {
      contacts.push(contact);
      this.setState({
        ...this.state,
        contacts
      });
    }
  };

  render() {
    const { project, loading, business, contacts } = this.state;
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

              <ProjectAccounts
                accounts={project.accounts}
                projectId={project._id}
                getProjectDetail={this.getProjectDetail}
              />
            </Tab>
            <Tab
              options={{
                duration: 300,
                onShow: null,
                responsiveThreshold: Infinity,
                swipeable: false
              }}
              title="Contacts"
            >
              <Row>
                <h5>Contacts </h5>
                <ContactForm
                  business={business}
                  addMoreContactToTable={this.addMoreContactToTable}
                />
                <ContactTable contacts={contacts} business={business} />
              </Row>
            </Tab>
            <Tab
              options={{
                duration: 300,
                onShow: null,
                responsiveThreshold: Infinity,
                swipeable: false
              }}
              title="Uploads"
            >
              <h5>Uploads</h5>
              <UploadModal projectId={project._id}  getProjectDetail={this.getProjectDetail}/>
              <UploadTable uploads={project.uploads}/>
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
              Test 5
            </Tab> */}
          </Tabs>
        </Row>
      </div>
    );
  }
}

export default connect(mapStateToProps)(ProjectDetailPage);
