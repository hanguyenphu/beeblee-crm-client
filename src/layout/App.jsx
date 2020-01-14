import React, { Component } from "react";
import { Route, Switch, withRouter, Redirect, BrowserRouter as Router } from "react-router-dom";
import Nav from "../layout/menu/Nav";
import { Container } from "react-materialize";
import Login from "../features/login/Login";
import Project from "../features/projects/Project";
import {connect} from 'react-redux'
import Profile from "../features/profile/Profile";
import Business from "../features/business/Business";
const mapStateToProps = state => {
    return { user: state.user };
};

class App extends Component {
    render() {
        const loggedIn = this.props.user.authenticated
        return (
            <Router>
                <Route
                    path=''
                    render={() => (
                        <div >
                            <Nav />
                            <Container className='main' >
                                <Switch>
                                    <Route exact path='/projects'> 
                                        {loggedIn ? <Project/> : <Redirect to="/login" />}
                                    </Route>
                                    <Route exact path='/businesses'> 
                                        {loggedIn ? <Business/> : <Redirect to="/login" />}
                                    </Route>
                                    <Route exact path='/profile/me'> 
                                        {loggedIn ? <Profile/> : <Redirect to="/login" />}
                                    </Route>
                                    <Route exact path='/login' >
                                        {/* <Login/> */}
                                        {loggedIn ? <Redirect to="/projects" /> : <Login/>}
                                    </Route>
                                    <Route exact path='/*' >
                                        {/* <Login/> */}
                                        {loggedIn ? <Redirect to="/projects" /> : <Redirect to="/login" />}
                                    </Route>
                                </Switch>
                            </Container>
                        </div>
                    )}
                />
            </Router>
        );
    }
}

export default connect(mapStateToProps)(App);
