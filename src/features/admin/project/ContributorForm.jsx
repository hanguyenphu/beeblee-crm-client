import React, { Component } from "react";
import { connect } from "react-redux";
import { Chip, Icon, Row, Table, Button } from "react-materialize";
import API from "../../../utils/API/API";

function mapStateToProps(state) {
  return {};
}

class ContributorForm extends Component {
  state = {
    contributors: [],
    users: [],
    project: {},
    edited: false,
    successMessage: "",
    errorMessage: ""
  };
  componentDidMount() {
    let { contributors, users, project } = this.props;
    this.setState({
      contributors,
      users,
      project
    });
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.contributors !== this.props.contributor) {
      this.setState({
        contributors: nextProps.contributors,
        users: nextProps.users,
        project: nextProps.project
      });
    }
  }
  displayContributor = () => {
    const { contributors } = this.state;
    const data = [];
    contributors.forEach(contributor => {
      const name = contributor.name;
      const userId = contributor._id;
      data.push({ tag: name, userId });
    });
    return (
      <Chip
        close={true}
        closeIcon={<Icon className="close">close</Icon>}
        options={{
          data: data,
          placeholder: "Contributors",
          onChipDelete: this.removeContributor(data)
        }}
      />
    );
  };
  removeContributor = newContributorData => () => {
    let newContributors = [];
    newContributorData.forEach(contributor => {
      newContributors.push(contributor.userId);
    });
    let currentContributors = this.state.contributors;
    currentContributors = currentContributors.filter(contributor =>
      newContributors.includes(contributor._id)
    );
    this.setState({
      contributors: currentContributors,
      edited: true,
      errorMessage: ""
    });
  };

  addContributor = user => () => {
    let currentContributors = this.state.contributors;
    if (!currentContributors.includes(user)) {
      currentContributors.push(user);
      this.setState({
        contributors: currentContributors,
        errorMessage: "",
        edited: true
      });
    } else {
      this.setState({
        errorMessage: "Contributor already exist!",
        successMessage: ""
      });
    }
  };

  handleUpdateContributors = e => {
    e.preventDefault();

    const { contributors } = this.state;
    let userIds = [];
    contributors.forEach(contributor => {
        userIds.push(contributor._id)
    });

    const projectId = this.state.project._id

    if(projectId) {
        API.patch("/projects", {projectId, userIds}).then(response => {
            this.setState({
                successMessage: "Update project successfully!",
                errorMessage: "",
                edited: false,
            })
            this.props.updateData()
        }).catch(error => {
            this.setState({
                successMessage: "",
                errorMessage: "There is an error occurred!",
                edited: false,
            })
        })
    } else {
        this.setState({
            errorMessage: "Missing Project Id for update",
            successMessage: ""
        })
    }

  };

  displayUser = () => {
    const { users } = this.props;
    return users.map(user => {
      return (
        <tr key={user._id}>
          <td>{user.name}</td>
          <td>{user.email}</td>
          <td>{user.role}</td>
          <td>
            {user.active.toString() === "true" ? (
              <span className="dot active"></span>
            ) : (
              <span className="dot inactive"></span>
            )}
          </td>
          <td>
            <Button
              node="button"
              className="gradient-btn btn-red"
              style={{
                marginRight: "5px"
              }}
              waves="light"
              onClick={this.addContributor(user)}
            >
              Add
              <Icon left>add</Icon>
            </Button>
          </td>
        </tr>
      );
    });
  };

  render() {
    const { edited } = this.state;
    return (
      <div>
        {this.displayContributor()}
        <Row>
          <Table hoverable={true} responsive={true}>
            <thead>
              <tr>
                <th data-field="name">Name</th>
                <th data-field="email">Email</th>
                <th data-field="role">Role</th>
                <th data-field="active">Active</th>
                <th data-field="add">Add</th>
              </tr>
            </thead>
            <tbody>{this.displayUser()}</tbody>
          </Table>
        </Row>
        <Row>
          <Button
            node="button"
            style={{
              margin: "5px"
            }}
            waves="light"
            className={edited ? "gradient-btn btn-green" : ""}
            disabled={!edited}
            onClick={this.handleUpdateContributors}
          >
            Save
            <Icon left>save</Icon>
          </Button>
        </Row>
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

export default connect(mapStateToProps)(ContributorForm);
