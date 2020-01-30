import React, { Component } from "react";
import { connect } from "react-redux";
import { Table, Icon } from "react-materialize";
import API from "../../../utils/API/API";
import EditContributorsModal from "./EditContributorsModal";
import Axios from "axios";
import Loading from "../../loading/Loading";
function mapStateToProps(state) {
  return {};
}

class ProjectTableAdmin extends Component {
  state = {
    loading: true,
    projects: [],
    statuses: [],
    opendEditContributorsModal: false,
    users: []
  };
  componentDidMount() {
    if (this.props.projects) {
      this.setState({
        ...this.state,
        projects: this.props.projects,
        loading: false
      });
    }

    this.getData();
  }

  getData = () => {
    const getStatusesRequest = API.get("/statuses");
    const getUsersRequest = API.get(`/admin/users`);
    Axios.all([getStatusesRequest, getUsersRequest])
      .then(
        Axios.spread((...responses) => {
          const statuses = responses[0].data;
          const users = responses[1].data;
          this.setState({
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
      });
  };

  openEditContributorModal = project => () => {
    this.setState({
      opendEditContributorsModal: true,
      project
    });
  };

  closeEditContributorsModal = e => {
    this.setState({
      opendEditContributorsModal: false
    });
  };

  displayContributor = project => {
    const { users } = this.state;
    const contributors = users.filter(user =>
      project.contributors.includes(user._id)
    );

    return (
      contributors.length > 0 &&
      contributors.map(contributor => {
        return <li key={contributor._id}>{contributor.name}</li>;
      })
    );
  };

  displayProjects = projects => {
    const { statuses } = this.state;
    return projects.map(project => {
      const status = statuses.filter(
        status => status._id === project.status
      )[0];

      return (
        <tr key={project._id}>
          <td>
            <a href={"/projects/" + project._id}>{project.name}</a>
          </td>
          <td>{project.price.$numberDecimal}</td>
          <td>
            {status && (
              <p style={{ color: `${status.color}` }}>{status.title}</p>
            )}
          </td>
          <td>
            <ul>{this.displayContributor(project)}</ul>
          </td>
          <td>
            <a href="#" onClick={this.openEditContributorModal(project)}>
              <Icon>edit</Icon>
            </a>
          </td>
        </tr>
      );
    });
  };
  render() {
    const { projects } = this.props;
    const { project, opendEditContributorsModal, loading } = this.state;
    if (loading) {
      return <Loading />;
    }
    return (
      <div>
        <Table>
          <thead>
            <tr>
              <th data-field="name">Name</th>
              <th data-field="price">Price</th>
              <th data-field="status">Status</th>
              <th data-field="contributors">Contributors</th>
              <th data-field="edit">Edit</th>
            </tr>
          </thead>
          <tbody>
            {projects.length > 0 ? (
              this.displayProjects(projects)
            ) : (
              <tr>
                <td>There is no project found!</td>
              </tr>
            )}
          </tbody>
        </Table>
        {opendEditContributorsModal && (
          <EditContributorsModal
            project={project}
            closeEditContributorsModal={this.closeEditContributorsModal}
            updateData={this.props.updateData}
          />
        )}
      </div>
    );
  }
}

export default connect(mapStateToProps)(ProjectTableAdmin);
