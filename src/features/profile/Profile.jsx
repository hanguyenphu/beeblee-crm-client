import React, { Component } from "react";
import { Row, Col, TextInput, Button, Icon } from "react-materialize";
import { connect } from "react-redux";
import Loading from "../loading/Loading";
import axios from "axios";
import { update_profile } from "../../redux/actions/index";
import API from "../../utils/API/API";
import formatPhone from "../../utils/commons/FormatPhone";

const mapStateToProps = state => {
    return { user: state.user };
};

function mapDispatchToProps(dispatch) {
    return {
        update_profile: newProfile => dispatch(update_profile(newProfile))
    };
}

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {
                name: "",
                email: "",
                phone: ""
            },
            currentPassword: "",
            newPassword: "",
            repeatPassword: "",
            errMessage: "",
            sussess: false,
            edited: false
        };
    }

    componentDidMount() {
        const user = this.props.user;
        this.setState(prevState => ({
            ...prevState,
            user: {
                ...this.state.user,
                email: user.email,
                name: user.name,
                phone: user.phone,

            }
        }));
    }

    handleInputChange = e => {
        const user = { ...this.state.user };
        const field = e.target.name;
        let newValue = e.target.value;
        if (field === "phone") {
            newValue = formatPhone(newValue);
        }
        user[field] = newValue;
        this.setState({ user, edited: true });
    };

    handlePasswordInputChange = e => {
        const field = e.target.name;
        const newValue = e.target.value;
        this.setState({
            [field]: newValue
        });
    };

    handleSubmitNewPassword = e => {
        e.preventDefault();
        const { currentPassword, newPassword, repeatPassword } = this.state;

        this.setState({
            errMessage: "",
            sussess: false
        });
        if (newPassword !== repeatPassword) {
            this.setState({
                errMessage: "Passwords do not match!"
            });
        } else {
            const data = { currentPassword, newPassword };

            API.patch(`/users/update/password`, {
                data
            })
                .then(response => {
                    this.setState({
                        sussess: true,
                        currentPassword: "",
                        newPassword: "",
                        repeatPassword: ""
                    });
                })
                .catch(error => {
                    {
                        this.setState({
                            errMessage:
                                "Incorrect Current Password or some errors have been occurred"
                        });
                    }
                });
        }
    };

    handleSubmit = e => {
        e.preventDefault();
        const data = this.state.user;
        this.setState({
            errMessage: "",
            sussess: false,
            edited: false,
        });

        //get the token for verifying request
        // this.includeTokenWithRequest();

        API.patch(`users/update/profile`, {
            data
        })
            .then(response => {
                const user = response.data;
                this.props.update_profile(user);
                this.setState({
                    sussess: true
                });
            })
            .catch(error => {
                console.log(error);
                this.setState({
                    errMessage: "Some errors has been occurred!"
                });
            });
    };

    render() {
        if (!this.state.user) {
            return <Loading />;
        }
        const {
            user,
            currentPassword,
            newPassword,
            repeatPassword,
            errMessage,
            sussess,
            edited
        } = this.state;

        return (
            <div >
                <form
                    onSubmit={this.handleSubmit}
                    style={{
                        backgroundColor: "white",
                        marginTop: "30px",
                        padding: "30px",
                        boxShadow: "1px 1px 1px #9E9E9E"
                    }}
                >
                    <h6 >User Profile</h6>

                    {sussess && (
                        <Row >
                            <Col s={12} m={6} l={6} xl={6}>
                                <p className='green-text animated bounceInRigh'>
                                    Update Sussessfully{" "}
                                </p>
                            </Col>
                        </Row>
                    )}

                    {errMessage && (
                        <Row>
                            <Col s={12} m={6} l={6} xl={6}>
                                <p className=' deep-orange-text animated shake '>
                                    {errMessage || ""}
                                </p>
                            </Col>
                        </Row>
                    )}
                    <Row className="animated bounceInRigh">
                        <Col s={12} m={6} l={6} xl={6}>
                            <TextInput
                                s={12}
                                l={12}
                                m={12}
                                label='Name'
                                value={user.name}
                                name='name'
                                onChange={this.handleInputChange}
                            />
                        </Col>
                        <Col s={12} m={6} l={6} xl={6}>
                            <TextInput
                                email
                                validate
                                disabled
                                s={12}
                                l={12}
                                m={12}
                                label='Email'
                                value={user.email}
                                readOnly
                            />
                        </Col>
                        <Col s={12} m={6} l={6} xl={6}>
                            <TextInput
                                s={12}
                                l={12}
                                m={12}
                                label='Phone'
                                name='phone'
                                value={user.phone}
                                onChange={this.handleInputChange}
                            />
                        </Col>
                    </Row>

                    <Row>
                        <Button node='button' type='submit' waves='light' className={edited ?"gradient-btn btn-blue": ""} disabled={!edited}>
                            Save
                            <Icon right>send</Icon>
                        </Button>
                    </Row>
                </form>
                <form
                    onSubmit={this.handleSubmitNewPassword}
                    style={{
                        backgroundColor: "white",
                        padding: "30px",
                        boxShadow: "1px 1px 1px #9E9E9E"
                    }}
                >
                    <Row>
                        <h6>Change Password</h6>
                        <Col s={12} m={12} l={12} xl={12}>
                            <TextInput
                                password
                                required
                                s={12}
                                l={12}
                                m={12}
                                label='Current Password'
                                name='currentPassword'
                                value={currentPassword}
                                onChange={this.handlePasswordInputChange}
                            />
                        </Col>
                        <Col s={12} m={6} l={6} xl={6}>
                            <TextInput
                                password
                                required
                                s={12}
                                l={12}
                                m={12}
                                label='New Password'
                                name='newPassword'
                                value={newPassword}
                                onChange={this.handlePasswordInputChange}
                            />
                        </Col>
                        <Col s={12} m={6} l={6} xl={6}>
                            <TextInput
                                password
                                required
                                s={12}
                                l={12}
                                m={12}
                                label='Repeat Password'
                                name='repeatPassword'
                                value={repeatPassword}
                                onChange={this.handlePasswordInputChange}
                            />
                        </Col>
                    </Row>

                    <Row>
                        <Button node='button' type='submit' waves='light' className= "gradient-btn btn-green">
                            Change Password
                            <Icon right>lock</Icon>
                        </Button>
                    </Row>
                </form>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
