import React, { Component } from "react";
import {
  Route,
  Switch,
  withRouter,
  Redirect,
  BrowserRouter as Router
} from "react-router-dom";
import Nav from "../layout/menu/Nav";
import { Container } from "react-materialize";
import Login from "../features/login/Login";
import Project from "../features/projects/Project";
import { connect } from "react-redux";
import Profile from "../features/profile/Profile";
import Business from "../features/business/Business";
import Contact from "../features/contact/Contact";
import BusinessDetailPage from "../features/business/BusinessDetailPage";
import ProjectDetailPage from "../features/projects/ProjectDetailPage";
import ViewUpload from "../features/upload/ViewUpload";
import User from "../features/admin/user/User";
import NotFound from "../features/admin/notfound/NotFound";
import ProjectContributors from "../features/admin/project/ProjectContributors";
import Status from "../features/admin/status/Status";
import Category from "../features/admin/category/Category";
import Province from "../features/admin/province/Province";
const mapStateToProps = state => {
  return { user: state.user };
};

class App extends Component {
  render() {
    const loggedIn = this.props.user.authenticated;
    const admin = this.props.user.role === "admin" && loggedIn ? true : false;
    return (
      <Router>
        <Route
          path="/(.+)"
          render={() => (
            <div>
              <Nav />
              <Container className="main">
                <Switch>
                  {admin && (
                    <Route
                      exact
                      path="/admin/users"
                      component={admin ? User : NotFound}
                    />
                  )}
                  {admin && (
                    <Route
                      exact
                      path="/admin/projects"
                      component={admin ? ProjectContributors : NotFound}
                    />
                  )}
                   {admin && (
                    <Route
                      exact
                      path="/admin/statuses"
                      component={admin ? Status : NotFound}
                    />
                  )}
                  {admin && (
                    <Route
                      exact
                      path="/admin/categories"
                      component={admin ? Category : NotFound}
                    />
                  )}
                    {admin && (
                    <Route
                      exact
                      path="/admin/provinces"
                      component={admin ? Province : NotFound}
                    />
                  )}


                  <Route
                    exact
                    path="/projects"
                    component={loggedIn ? Project : Login}
                  />
                  <Route
                    exact
                    path="/businesses"
                    component={loggedIn ? Business : Login}
                  />
                  <Route
                    path="/businesses/:id"
                    component={loggedIn ? BusinessDetailPage : Login}
                  />
                  <Route
                    path="/projects/:id"
                    component={loggedIn ? ProjectDetailPage : Login}
                  />
                  <Route
                    exact
                    path="/contacts"
                    component={loggedIn ? Contact : Login}
                  />
                  <Route
                    exact
                    path="/profile/me"
                    component={loggedIn ? Profile : Login}
                  />
                  <Route
                    exact
                    path="/login"
                    component={loggedIn ? Project : Login}
                  />
                  <Route
                    exact
                    path="/viewupload/:id"
                    component={loggedIn ? ViewUpload : Login}
                  />
                  <Route
                    exact
                    path="/notfound"
                    component={loggedIn ? NotFound : Login}
                  />
                  <Route
                    exact
                    path="/*"
                    component={loggedIn ? NotFound : Login}
                  />
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
