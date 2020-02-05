import React, { Component } from "react";
import { connect } from "react-redux";
import { TextInput, Icon, Button, Col, Row, Table } from "react-materialize";
import API from "../../utils/API/API";
import Loading from "../loading/Loading";

class Contact extends Component {
  state = {
    contacts: [],
    loading: true
  };

  componentDidMount() {
    API.get(`contacts`)
      .then(response => {
        this.setState({
          contacts: response.data,
          loading: false
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    const { contacts, loading } = this.state;
    if (loading) {
      return <Loading />;
    }

    return (
      <div>
        <Row style={{ marginTop: "20px" }}></Row>
        <Row>
          <Col>
            <h5>Contact List</h5>
          </Col>
        </Row>
        <Row className="animated fadeInDown radius-corner"
          style={{
            backgroundColor: "white",
            padding: "20px",
            boxShadow: "1px 1px 1px #9E9E9E"
          }}
        >
          <Table striped={true} responsive={true}>
            <thead>
              <tr>
                <th data-field="name">Name</th>
                <th data-field="phone">Phone</th>
                <th data-field="email">Email</th>
                <th data-field="business">Details</th>
              </tr>
            </thead>
            <tbody>
              {contacts.map(contact => {
                return (
                  <tr key={contact._id}>
                    <td>{contact.name}</td>
                    <td>{contact.phone}</td>
                    <td>{contact.email}</td>

                    <td>
                      <a className="modal-trigger" href="#modal1">
                        <Icon>launch</Icon>
                      </a>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Contact);
