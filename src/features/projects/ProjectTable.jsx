import React, { Component } from "react";
import { connect } from "react-redux";
import { Table } from "react-materialize";
import API from "../../utils/API/API";
import Loading from "../loading/Loading";
import formatDate from "../../utils/commons/FormatDate"
function mapStateToProps(state) {
  return {};
}

//Display all project in a table
//required Projects array as a prop
class ProjectTable extends Component {
  state = {
    loading: true,
    projects: [],
    statuses: []
  };
  componentDidMount() {
    if (this.props.projects) {
      this.setState({
        ...this.state,
        projects: this.props.projects,
        loading: false
      });
    }

    API.get("/statuses")
    .then(response => {
      this.setState({
        ...this.state,
        statuses: response.data,
        loading: false
      });
    })
    .catch(error => {
      this.setState({
        ...this.state,
        loading: false
      });
      console.log(error);
    });
  }

  displayProjects = projects => {
    const {statuses} = this.state

    return projects.map(project => {
      const startDate = new Date(project.startDate);
      const completedDate = new Date(project.completedDate);
      const status = statuses.filter(status => status._id === project.status)[0]

      return (
        <tr key={project._id}>
          <td>
            <a href={"/projects/" + project._id}>{project.name}</a>
          </td>
          <td>{project.price}</td>
          <td>
           {status && <p style={{ color: `${status.color}` }}>{status.title}</p>}
          </td>
          <td>{project.startDate && formatDate(startDate)}</td>
          <td>{project.completedDate && formatDate(completedDate)}</td>
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
            <th data-field="status">Status</th>
            <th data-field="startDate">Start Date</th>
            <th data-field="completedDate">Completed Date</th>
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
