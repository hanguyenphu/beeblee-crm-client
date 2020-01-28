import React, { Component } from "react";
import { connect } from "react-redux";
import { Table } from "react-materialize";
import API from "../../utils/API/API";
import Loading from "../loading/Loading";
import StatusDropdown from "../common/StatusDropdown";
import DisplayStatus from "../common/DisplayStatus";
function mapStateToProps(state) {
  return {};
}

//Display all project in a table
//required Projects array as a prop
class ProjectTable extends Component {
  state = {
    loading: true,
    projects: []
  };
  componentDidMount() {
    if (this.props.projects) {
      this.setState({
        ...this.state,
        projects: this.props.projects,
        loading: false
      });
    }
  }

  displayProjects = projects => {
    return projects.map(project => {
      const startDate = new Date(project.startDate);
      const completedDate = new Date(project.completedDate);

      return (
        <tr key={project._id}>
          <td>
            <a href={"/projects/" + project._id}>{project.name}</a>
          </td>
          <td>{project.price.$numberDecimal}</td>
          <td>
            <DisplayStatus status={project.status} />
          </td>
          <td>{project.startDate && startDate.toDateString()}</td>
          <td>{project.completedDate && completedDate.toDateString()}</td>
        </tr>
      );
    });
  };

  render() {
    const { loading } = this.state;
    if (loading) {
      return <Loading />;
    }
    const { projects } = this.props;

    return (
      <Table className="animated fadeIn"  striped={true} responsive={true}>
        <thead>
          <tr>
            <th data-field="id">Project Name</th>
            <th data-field="name">Price</th>
            <th data-field="price">Status</th>
            <th data-field="price">Start Date</th>
            <th data-field="price">Completed Date</th>
          </tr>
        </thead>
        <tbody>
          {projects.length>0 ? (
            this.displayProjects(projects)
          ) : (
            <tr>
              <td>There is no project found!</td>
            </tr>
          )}
        </tbody>
      </Table>
    );
  }
}

export default connect(mapStateToProps)(ProjectTable);
