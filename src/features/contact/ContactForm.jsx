import React, { Component } from "react";
import { connect } from "react-redux";
import { TextInput, Icon, Button, Row } from "react-materialize";
import API from "../../utils/API/API";

import formatPhone from "../../utils/commons/FormatPhone"

class ContactForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            contact: {
                name: "",
                phone: "",
                email: ""
            }
        };
    }

    handleCreateContact = e => {
        e.preventDefault();

        const contact = this.state.contact;
        const business = this.props.business || {};
        if (business) {
            contact.business = business._id;
        }
        API
            .post(`contacts`, contact)
            .then(response => {
                if (response.data.duplicated) {
                    this.setState({
                        dublicated: true,
                        dublicatedContact: response.data.contact
                    });
                } else {
                    this.setState({
                        successMessage: "Save successfully"
                    });

                    this.props.addMoreContactToTable(response.data.contact);
                }
            })
            .catch(error => {
                this.setState({
                    errorMessage: "Cannot save the data"
                });
            });
    };

    handleInputChange = e => {
        this.setState({
            ...this.state,
            successMessage: "",
            errorMessage: ""
        });

        const field = e.target.name;
        let value = e.target.value;

        if (field === "phone") {
            value=formatPhone(value)
        }

        let contact = {
            ...this.state.contact,
            [field]: value
        };

        this.setState({
            contact
        });
    };

    cancelContact = e => {
        e.preventDefault();
        this.setState({
            ...this.state,
            dublicated: false,
            dublicatedContact: {},
            successMessage: "",
            errorMessage: ""
        });
    };

    useExistingContact = e => {
        e.preventDefault();
        const contact = this.state.dublicatedContact;
        const business = this.props.business;

        API
            .patch(`businesses/addContact/${business._id}`, contact)
            .then(response => {
                if (!business.contacts.includes(contact._id)) {
                    this.props.addMoreContactToTable(contact);
                }
                this.setState({
                    ...this.state,
                    dublicated: false,
                    dublicatedContact: {},
                    successMessage: "Save successfully",
                    errorMessage: ""
                });
            })
            .catch(error => {
                this.setState({
                    errorMessage: "Cannot save the contact to the business"
                });
            });
    };

    render() {
        const contact = this.state.contact;

        return (
            <div>
                <form onSubmit={this.handleCreateContact} >
                    <Row >
                        <TextInput
                            s={12}
                            l={2}
                            m={2}
                            xl={2}
                            label='Name'
                            name='name'
                            value={contact.name}
                            required
                            onChange={this.handleInputChange}
                        />
                        <TextInput
                            s={12}
                            l={3}
                            m={3}
                            xl={3}
                            label='Phone'
                            name='phone'
                            value={contact.phone}
                            required
                            onChange={this.handleInputChange}
                        />
                        <TextInput
                            s={12}
                            l={6}
                            m={4}
                            xl={4}
                            label='Email'
                            email
                            validate
                            value={contact.email}
                            name='email'
                            onChange={this.handleInputChange}
                        />
                        <Button
                            node='button'
                            type='submit'
                            waves='light'
                            style={{ marginTop: "20px" }}
                            className="gradient-btn btn-red"
                        >
                            Add
                            <Icon left>add_box</Icon>
                        </Button>
                    </Row>
                    <Row>
                        {this.state.successMessage && (
                            <p className='green-text'>
                                {this.state.successMessage}
                            </p>
                        )}
                    </Row>

                    {this.state.dublicated && (
                        <Row className="animated jello">
                            <h6 className='red-text'>
                                A contact has been found with this phone number
                            </h6>
                            <p>Name: {this.state.dublicatedContact.name}</p>
                            <p>Phone: {this.state.dublicatedContact.phone}</p>
                            <p>Email: {this.state.dublicatedContact.email}</p>
                            <Row>
                                <Button onClick={this.useExistingContact}>
                                    Use this contact
                                </Button>
                                <Button
                                    className=' black-text grey lighten-4'
                                    style={{ marginLeft: "20px" }}
                                    onClick={this.cancelContact}
                                >
                                    Cancel
                                </Button>
                            </Row>
                        </Row>
                    )}
                </form>
            </div>
        );
    }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ContactForm);
