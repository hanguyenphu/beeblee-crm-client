import React, { Component } from "react";
import { TextInput, Row, Col, Button, Icon } from "react-materialize";
import Loading from "../loading/Loading";
import API from "../../utils/API/API"
import { authenticate } from "../../redux/actions/index";
import { connect } from "react-redux";

function mapDispatchToProps(dispatch) {
    return {
        authenticate: authenticated => dispatch(authenticate(authenticated))
    };
}

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            loading: false,
            errorMessage: ""
        };
    }

    handleChange = e => {
        this.setState({
            ...this.state,
            [e.target.name]: e.target.value
        });
    };

    handleSubmit = e => {
        e.preventDefault();
        const { email, password } = this.state;
        this.setState({
            ...this.state,
            errorMessage:""
        })
        API
            .post(`users/login`, {
                email,
                password
            })
            .then(response => {
                response.data.user.authenticated = true;
                localStorage.setItem("token", response.data.token);
                if (response.data) {
                    response.data.authenticated = true;
                    this.props.authenticate(response.data);
                }
            })
            .catch(error => {
                this.setState({
                    errorMessage: "Incorrect Email or Password",
                    loading: false
                });
            });
    };

    render() {
        const { email, password, loading, errorMessage } = this.state;
        const { user } = this.props;
        return (
            <div
                style={{
                    marginTop: "70px",
                    backgroundColor: "white",
                    padding: "20px",
                    boxShadow: "1px 1px 1px #9E9E9E",
                    borderRadius: "7px",

                }}
            >
                <Row>
                    <Col m={5} x={5} l={5}></Col>
                    <Col m={2} s={12}>
                        <h3> Login</h3>
                    </Col>
                    <Col m={5} x={5} l={5}></Col>
                </Row>
                <Row className="animated bounceInRight" >
                    <form onSubmit={this.handleSubmit}>
                        <TextInput
                            m={12}
                            x={12}
                            l={12}
                            s={12}
                            name='email'
                            value={email}
                            email
                            label='Email'
                            validate
                            required
                            onChange={this.handleChange}
                        />
                        <TextInput
                            m={12}
                            x={12}
                            l={12}
                            s={12}
                            label='Password'
                            name='password'
                            value={password}
                            password
                            required
                            onChange={this.handleChange}
                        />


                        {!loading ? (
                            <Button node='button' waves='light' className="gradient-btn btn-blue">
                                Login
                                <Icon right>send</Icon>
                            </Button>
                        ) : (
                            <Loading />
                        )}
                    </form>
                    {errorMessage && (
                            <div className='red-text text-accent-2 animated shake'>
                                <p className='animated bounceOutLeft delay-2s' > {errorMessage}</p>
                            </div>
                        )}
                        <br />
                </Row>
            </div>
        );
    }
}
export default connect(null, mapDispatchToProps)(Login);
// export default Login
