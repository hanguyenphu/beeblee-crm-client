import React, { Component } from "react";
import { SideNavItem } from "react-materialize";
import { connect } from "react-redux";

import { logout } from "../../redux/actions/index";

const mapStateToProps = state => {
  return { user: state.user };
};

function mapDispatchToProps(dispatch) {
  return {
    logout: () => dispatch(logout())
  };
}

class SideNavItems extends Component {
  handleLogout = e => {
    e.preventDefault();

    this.props.logout();
  };

  displayAdminMenu = user => {
    if (user.role === "admin") {
      return (
        <div>
          <SideNavItem divider />
          <SideNavItem subheader>Admin</SideNavItem>
          <SideNavItem href="/admin/projects" icon="assignment_turned_in">
            Project Contributors
          </SideNavItem>
          <SideNavItem href="/admin/users" icon="group">
            Manage Users
          </SideNavItem>
          <SideNavItem href="/admin/statuses" icon="star">
            Manage Status
          </SideNavItem>
          <SideNavItem href="/admin/categories" icon="category">
            Manage Category
          </SideNavItem>
          <SideNavItem href="/admin/provinces" icon="museum">
            Manage Provinces
          </SideNavItem>
        </div>
      );
    }
  };

  render() {
    const { user } = this.props;

    return (
      <div>
        {user.authenticated ? (
          <div>
            <SideNavItem
              user={{
                background: "https://source.unsplash.com/random/300x112",
                // "../img/gaelle-marcel-bay4zMs4zTc-unsplash.jpg",
                email: user.email,
                name: user.name
              }}
              userView
            />

            <SideNavItem href="/businesses" icon="storefront">
              Business
            </SideNavItem>

            <SideNavItem href="/projects" icon="assignment_turned_in">
              Projects
            </SideNavItem>

            <SideNavItem href="/contacts" icon="account_box">
              Contacts
            </SideNavItem>
            {this.displayAdminMenu(user)}
            <SideNavItem divider />
            <SideNavItem subheader>My Account</SideNavItem>
            <SideNavItem href="/profile/me" waves icon="person_pin">
              Profile
            </SideNavItem>
            <SideNavItem
              href="/logout"
              onClick={this.handleLogout}
              waves
              icon="power_settings_new"
            >
              Logout
            </SideNavItem>
          </div>
        ) : (
          <div>
            <SideNavItem
              user={{
                background: "img/jeremy-bishop-BuQ-jgeexaQ-unsplash.jpg",
                email: "Beeblee",
                name: ""
              }}
              userView
            />
            <SideNavItem href="/login" waves icon="trending_flat">
              Login
            </SideNavItem>
          </div>
        )}
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SideNavItems);
