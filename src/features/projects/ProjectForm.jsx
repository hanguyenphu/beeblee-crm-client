import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Row,
  TextInput,
  Button,
  Textarea,
  DatePicker
} from "react-materialize";
// import PickDate from '../common/DatePicker'
import StatusDropdown from "../common/StatusDropdown";
import CategoryDropdown from "../common/CategoryDropdown";
import API from "../../utils/API/API";
import formatDate from "../../utils/commons/FormatDate"
import Loading from "../loading/Loading";

function mapStateToProps(state) {
  return {};
}

class ProjectForm extends Component {
  state = {
    // project: {
    //   business: "",
    //   name: "",
    //   description: "",
    //   price: "",
    //   googleLink: "",
    //   startDate: "",
    //   completedDate: "",
    //   status: "",
    //   category: ""
    // },
    edited: false,
    successMessage: "",
    errorMessage: ""
  };

  handleChangeProject = e => {
    const field = e.target.name;
    let value = e.target.value;

    let project = this.state.project;
    project[field] = value;
    this.setState({
      project,
      edited: true
    });
  };

  componentDidMount() {
    let  project = {
      business: "",
      name: "",
      description: "",
      price: "",
      googleLink: "",
      startDate: "",
      completedDate: "",
      status: "",
      category: ""
    }
    if (this.props.business) {

      project.business = this.props.business._id;

      this.setState({
        ...this.state,
        project
      });
    }
    if (this.props.project) {
      project = this.props.project;
      project.price = project.price.$numberDecimal;
      this.setState({
        ...this.state,
        project
      });
    }
  }

  createProject = project => {
    API.post("/projects", project).then(response => {
      this.setState({
        edited: false,
        successMessage: "Saved successfully!",
        errorMessage: ""
      });
      this.props.getBusinessData();
      this.props.closeCreateProjectModal()
    });
  };

  updateProject = project => {
    API.patch(`/projects/${project._id}`, project).then(response => {

      this.setState({
        edited: false,
        successMessage: "Saved successfully!",
        errorMessage: ""
      });
    });
  }


  handleSubmit = e => {
    e.preventDefault();
    const project = this.state.project
    if (!project._id) {
      this.createProject(project)
    } else {
      this.updateProject(project)
    }
  };

  render() {
    const { edited, project } = this.state;

    if(!project){
      return <Loading/>
    }
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <Row className="">
            <TextInput
              s={12}
              l={12}
              m={12}
              xl={12}
              label="Name:"
              name="name"
              value={project.name}
              onChange={this.handleChangeProject}
              required
            />

            <Textarea
              s={12}
              l={12}
              m={12}
              xl={12}
              label="Description"
              name="description"
              value={project.description || "- Menu Link: \n\n- Template Link: \n\n- Additional: \n\n "}
              onChange={this.handleChangeProject}
              data-length={200}
            />
            <StatusDropdown
              handleChangeProject={this.handleChangeProject}
              status={project.status}
            />
            <CategoryDropdown
              handleChangeProject={this.handleChangeProject}
              category={project.category}
            />

            <TextInput
              s={12}
              l={6}
              m={6}
              xl={6}
              label="Price:"
              name="price"
              value={project.price}
              onChange={this.handleChangeProject}
              required
            />
            <TextInput
              s={12}
              l={6}
              m={6}
              xl={6}
              label="Google Link:"
              name="googleLink"
              value={project.googleLink}
              onChange={this.handleChangeProject}
            />

            <DatePicker
              name="startDate"
              label="Start Date:"
              s={12}
              l={6}
              m={6}
              xl={6}
              options={{
                format: "mmm dd, yyyy",
                defaultDate:  new Date(formatDate(project.startDate)),
                setDefaultDate: true
              }}
              required
              value={formatDate(project.startDate)}
              onChange={value => {
                let project = Object.assign(this.state.project, {startDate: value})
                this.setState({
                  ...this.state,
                  edited: true,
                  project
                });
              }}
            />

            {/* <TextInput type='date' className='datepicker'  /> */}

            <DatePicker
              name="completedDate"
              label="Completed Date:"
              s={12}
              l={6}
              m={6}
              xl={6}
              options={{
                format: "mmm dd, yyyy",
                defaultDate:  new Date(formatDate(project.completedDate)),
                setDefaultDate: true
              }}
              value={formatDate(project.completedDate)}
              onChange={value => {
                let project = Object.assign(this.state.project, {completedDate: value})
                this.setState({
                  ...this.state,
                  edited: true,
                  project
                });
              }}
            />
          </Row>
          <Row>
            <Button
              node="button"
              className={edited ? "gradient-btn btn-green" : ""}
              waves="green"
              disabled={!edited}
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

export default connect(mapStateToProps)(ProjectForm);
