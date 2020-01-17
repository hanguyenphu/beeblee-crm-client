import React, { Component } from "react";
import { connect } from "react-redux";
import { TextInput, Row, Icon, Button } from "react-materialize";
import Loading from "../loading/Loading";
import API from "../../utils/API/API";
import formatPhone from "../../utils/commons/FormatPhone";

class EditContactForm extends Component {
    state = {};

    componentDidMount() {
        this.setState({
            contact: this.props.contact,
            edited: false
        });
    }

    componentDidUpdate(prevProps) {
        if (prevProps.contact._id !== this.props.contact._id) {
            this.setState({
                contact: this.props.contact
            });
        }
    }

    handleUpdateContact = e => {
        e.preventDefault();
        const contact = this.state.contact;
        API.patch(`contacts/${contact._id}`, contact)
            .then(response => {
                this.props.updateContact(response.data);
                this.props.closeEditContact();
            })
            .catch(error => {
                console.log(error);
            });
    };

    handleInputChange = e => {
        const field = e.target.name;
        let value = e.target.value;

        if (field === "phone") {
            value = formatPhone(value);
        }

        let contact = {
            _id: this.state.contact._id,
            name: this.state.contact.name,
            phone: this.state.contact.phone,
            email: this.state.contact.email,
            [field]: value
        };
        this.setState({
            contact,
            edited: true
        });
    };

    handleCancel = () => {
        this.props.closeEditContact()
    }

    render() {
        if (!this.state.contact) {
            return <Loading />;
        }
        const { contact, edited } = this.state;

        return (
            <div className="animated bounceInLeft ">
                <form onSubmit={this.handleUpdateContact}>
                    <Row>
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
                            l={3}
                            m={3}
                            xl={3}
                            label='Email'
                            email
                            validate
                            value={contact.email}
                            name='email'
                            onChange={this.handleInputChange}
                        />
                        <Button

                            l={1}
                            m={1}
                            xl={1}
                            node='button'
                            type='submit'
                            waves='light'
                            style={{ marginTop: "20px" }}
                            disabled={!edited}
                            className={edited ? 'gradient-btn btn-blue': 'gradient-btn'}
                        >
                            Save
                            <Icon left>save</Icon>
                        </Button>
                        <Button
                            l={1}
                            m={1}
                            xl={1}
                            node='button'
                            type='reset'
                            waves='light'
                            style={{ marginTop: "20px", marginLeft:"10px" }}
                            onClick={this.handleCancel}
                            className='gradient-btn btn-white'
                        >
                            Cancel

                        </Button>
                    </Row>
                </form>
            </div>
        );
    }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(EditContactForm);
