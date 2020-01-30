import React, { Component } from "react";
import { connect } from "react-redux";
import { TextInput, Row, Select, Button } from "react-materialize";
import phoneFormat from "../../../utils/commons/FormatPhone";
import API from "../../../utils/API/API";
import Loading from "../../loading/Loading";

function mapStateToProps(state) {
  return {};
}

class UserForm extends Component {
  state = {
    user: {
      name: "",
      phone: "",
      email: "",
      role: "user",
      active: "true"
    },
    edited: false,
    successMessage: "",
    errorMessage: ""
  };

  componentDidMount() {
    let { user } = this.props;
    if (user) {
      user.active = user.active.toString();
      this.setState({
        user
      });
    }
  }

  handleChange = e => {
    const field = e.target.name;
    let value = e.target.value;
    if (field === "phone") {
      value = phoneFormat(value);
    }
    let user = this.state.user;
    user[field] = value;
    this.setState({
      user,
      edited: true,
      loading: false
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.setState({
      loading: true
    });
    const { user } = this.state;
    user._id? this.updateUserProfile(user) : this.createNewUser(user)
  };

  createNewUser = (user) => {
    API.post(`/users`, user)
    .then(response => {
      this.setState({
        errorMessage: "",
        successMessage: "User has been created!",
        loading: false,
        edited: false
      });
      this.props.updateData();
    })
    .catch(error => {
      this.setState({
        successMessage: "",
        errorMessage: "An error has been occurred!",
        loading: false,
        edited: false
      });
    });
  }

  updateUserProfile = (user) => {
      API.patch(`/users`, user).then(response=> {
        this.setState({
            errorMessage: "",
            successMessage: "User has been updated!",
            loading: false,
            edited: false
          });
      }).catch(error => {
        this.setState({
            successMessage: "",
            errorMessage: "An error has been occurred!",
            loading: false,
            edited: false
          });
      })
  }

  render() {
    const { user, edited, loading } = this.state;

    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <Row>
            <TextInput
              label="Name"
              name="name"
              s={12}
              m={6}
              xl={6}
              l={6}
              onChange={this.handleChange}
              value={user.name}
              required
            />
            <TextInput
              label="Email"
              name="email"
              validate
              email
              s={12}
              m={6}
              xl={6}
              l={6}
              onChange={this.handleChange}
              value={user.email}
              required
            />
            <TextInput
              label="Phone"
              s={12}
              m={6}
              xl={6}
              l={6}
              name="phone"
              onChange={this.handleChange}
              value={user.phone}
              required
            />
            <Select
              s={12}
              m={6}
              xl={6}
              l={6}
              label="Role"
              name="role"
              onChange={this.handleChange}
              options={{
                classes: "",
                dropdownOptions: {
                  alignment: "left",
                  autoTrigger: true,
                  closeOnClick: true,
                  constrainWidth: true,
                  container: null,
                  coverTrigger: true,
                  hover: false,
                  inDuration: 150,
                  onCloseEnd: null,
                  onCloseStart: null,
                  onOpenEnd: null,
                  onOpenStart: null,
                  outDuration: 250
                }
              }}
              value={user.role}
              required
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </Select>

            <Select
              s={12}
              m={6}
              xl={6}
              l={6}
              label="Active"
              name="active"
              onChange={this.handleChange}
              options={{
                classes: "",
                dropdownOptions: {
                  alignment: "left",
                  autoTrigger: true,
                  closeOnClick: true,
                  constrainWidth: true,
                  container: null,
                  coverTrigger: true,
                  hover: false,
                  inDuration: 150,
                  onCloseEnd: null,
                  onCloseStart: null,
                  onOpenEnd: null,
                  onOpenStart: null,
                  outDuration: 250
                }
              }}
              value={user.active}
              required
            >
              <option value="true">Active</option>
              <option value="false">Inactive</option>
            </Select>
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
        <Row>{loading && <Loading />}</Row>
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

export default connect(mapStateToProps)(UserForm);
