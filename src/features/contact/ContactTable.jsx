import React, { Component } from "react";
import { connect } from "react-redux";
import { Row, Col, Table, Icon } from "react-materialize";
import EditContactForm from "./EditContactForm";
import API from "../../utils/API/API";
export class ContactTable extends Component {

    constructor(props) {
        super(props)
        this.state = {
            contacts: []
        }
    }

    componentDidMount() {
        this.setState({
            contacts: this.props.contacts
        })
    }
    componentWillReceiveProps(prevProps) {
        if(prevProps.contacts.length !== this.props.contacts.length) {
           
            this.setState({
                contacts: this.props.contacts
            })
        }
    }

    handleRemoveContact = (contactId) => () => {
        const {business} = this.props
        const confirmed = window.confirm("Do you want to remove this contact from the business?")
       
        if(confirmed) {
           
            API.patch(`businesses/removeContact/${business._id}`, {contactId}).then(response => {
                let contactIds  = response.data.contacts 
                let contacts = this.state.contacts
                contacts = contacts.filter(contact => {
                    return contactIds.includes(contact._id)
                })
                this.setState({
                    ...this.state,
                    contacts
                })
            }).catch(error => {
                console.log(error)
            })
        }
    }

    handleEditContact = (contact) => () => {
        this.setState({
            individualContact: contact
        })
    }

    handleCloseEditContact = () => {
        this.setState({
            individualContact: null
        })
    }

    updateContact = (updatedContact) => {
        let contacts = this.state.contacts
        contacts = contacts.map(contact => {
            return contact._id == updatedContact._id? updatedContact:contact
        })
        this.setState({
            contacts
        })
       
    }
    render() {
        const { contacts } = this.state;

        return (
            <Row>
                <Col x={12} s={12} l={12} m={12} xl={12}>
                    <Table x={12} s={12} l={12} m={12} xl={12}>
                        <thead>
                            <tr>
                                <th data-field='id'>Name</th>
                                <th data-field='name'>Phone</th>
                                <th data-field='email'>Email</th>
                                <th data-field='action'>Action</th>
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
                                            <a href='#'
                                             style={{
                                                marginRight: "20px",
                                               
                                            }}
                                            onClick={this.handleEditContact(contact)}>
                                                <Icon>create</Icon>
                                            </a>
                                            <a
                                                href='#'
                                                style={{
                                                    
                                                    color: "red"
                                                }}
                                                onClick={this.handleRemoveContact(contact._id)}
                                            >
                                                <Icon>clear</Icon>
                                            </a>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </Table>
                </Col>

                {this.state.individualContact && <EditContactForm contact={this.state.individualContact} updateContact={this.updateContact} closeEditContact={this.handleCloseEditContact}/>}
            </Row>
        );
    }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ContactTable);
