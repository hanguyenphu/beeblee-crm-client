import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Row,
  TextInput,
  Textarea,
  Button,
  DatePicker
} from "react-materialize";
import API from "../../utils/API/API";
import formatDate from "../../utils/commons/FormatDate";
import Loading from "../loading/Loading";
function mapStateToProps(state) {
  return {};
}

class AccountForm extends Component {
  state = {
    // account: {
    //   domain: "",
    //   username: "",
    //   password: "",
    //   startDate: "",
    //   expireDate: "",
    //   price: "",
    //   description: ""
    // },
    edited: false,
    successMessage: "",
    errorMessage: ""
  };
  componentDidMount() {
    if (this.props.account) {
      let account = this.props.account;
      if (account.price.$numberDecimal) {
        account.price = account.price.$numberDecimal;
      }

      this.setState({
        ...this.state,
        account
      });
    }
  }

  handleChangeAccount = e => {
    const field = e.target.name;
    let value = e.target.value;

    let account = this.state.account;
    account[field] = value;
    this.setState({
      account,
      edited: true
    });
  };

  updateAccount = account => {
    API.patch(`/accounts/${account._id}`, account)
      .then(response => {
        this.setState({
          successMessage: "Saved Successfully",
          errorMessage: "",
          edited: false
        });
      })
      .catch(error => {
        this.setState({
          successMessage: "",
          errorMessage: "Some errors have been occured!",
          edited: false
        });
      });
  };

  createAccount = account => {
    API.post(`/accounts`, account)
      .then(response => {
        let account = {
          domain: "",
          username: "",
          password: "",
          startDate: "",
          expireDate: "",
          price: "",
          description: "",
          project: this.props.account.project
        };
        this.setState({
          successMessage: "Saved Successfully",
          errorMessage: "",
          edited: false,
          account
        });
        this.props.getProjectDetail();
      })
      .catch(error => {
        this.setState({
          successMessage: "",
          errorMessage: "Some errors have been occured!",
          edited: false
        });
      });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { account } = this.state;
    if (account._id) {
      this.updateAccount(account);
    } else {
      this.createAccount(account);
    }
  };

  render() {
    const { account, edited } = this.state;
    if (!account) {
      return <Loading />;
    }
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <Row>
            <TextInput
              s={12}
              l={6}
              m={6}
              xl={6}
              label="Domain:"
              name="domain"
              value={account.domain}
              onChange={this.handleChangeAccount}
              required
            />
            <TextInput
              s={12}
              l={6}
              m={6}
              xl={6}
              label="Username:"
              name="username"
              value={account.username}
              onChange={this.handleChangeAccount}
            />
            <TextInput
              s={12}
              l={6}
              m={6}
              xl={6}
              label="Password:"
              name="password"
              value={account.password}
              onChange={this.handleChangeAccount}
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
                defaultDate: new Date(formatDate(account.startDate)),
                setDefaultDate: true
              }}
              value={formatDate(account.startDate)}
              onChange={value => {
                let account = Object.assign(this.state.account, {
                  startDate: value
                });
                this.setState({
                  ...this.state,
                  edited: true,
                  account
                });
              }}
            />

            <DatePicker
              name="expireDate"
              label="Expire Date:"
              s={12}
              l={6}
              m={6}
              xl={6}
              options={{
                format: "mmm dd, yyyy",
                defaultDate: new Date(formatDate(account.expireDate)),
                setDefaultDate: true
              }}
              value={formatDate(account.expireDate)}
              onChange={value => {
                let account = Object.assign(this.state.account, {
                  expireDate: value
                });
                this.setState({
                  ...this.state,
                  edited: true,
                  account
                });
              }}
            />

            <TextInput
              s={12}
              l={6}
              m={6}
              xl={6}
              label="Price: (per year)"
              name="price"
              value={account.price}
              onChange={this.handleChangeAccount}
            />
            <Textarea
              s={12}
              l={12}
              m={12}
              xl={12}
              label="Description:"
              name="description"
              value={account.description}
              onChange={this.handleChangeAccount}
            />
          </Row>
          <Row>
            <Button
              node="button"
              className={edited ? "gradient-btn btn-primary" : ""}
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

export default connect(mapStateToProps)(AccountForm);
