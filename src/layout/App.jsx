import React, { Component } from "react";
import { Route, Switch, withRouter, Redirect, BrowserRouter as Router } from "react-router-dom";
import Nav from "../layout/menu/Nav";
import { Container } from "react-materialize";
import Login from "../features/login/Login";
import Project from "../features/projects/Project";
import {connect} from 'react-redux'
import Profile from "../features/profile/Profile";
import Business from "../features/business/Business";
import Contact from "../features/contact/Contact";
import BusinessDetailPage from "../features/business/BusinessDetailPage";
import ProjectDetailPage from "../features/projects/ProjectDetailPage";
const mapStateToProps = state => {
    return { user: state.user };
};

class App extends Component {
    render() {
        const loggedIn = this.props.user.authenticated
        return (
            <Router>
                <Route
                    path='/(.+)'
                    render={() => (
                        <div >
                            <Nav />
                            <Container className='main' >
                                <Switch>
                                    <Route exact path='/projects' component={ loggedIn ? Project: Login} />
                                    <Route exact path='/businesses' component={ loggedIn ? Business: Login} />
                                    <Route  path='/businesses/:id' component={ loggedIn ? BusinessDetailPage: Login} />
                                    <Route  path='/projects/:id' component={ loggedIn ? ProjectDetailPage: Login} />
                                    <Route exact path='/contacts' component={ loggedIn ? Contact: Login} />
                                    <Route exact path='/profile/me' component={ loggedIn ? Profile: Login} />
                                    <Route exact path='/login' component={ loggedIn ? Project: Login} />
                                    <Route exact path='/*' component={ loggedIn ? Project: Login} />
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
