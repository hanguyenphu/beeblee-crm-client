import React, { Component } from "react";
import { SideNavItem } from "react-materialize";
import { connect } from "react-redux";
import { useLocation } from "react-router-dom";

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

  defineLocation = () => {
    let url = window.location.href;
    if (url.includes("/admin")) {
      if (url.includes("projects")) {
        return "admin/projects";
      } else if (url.includes("users")) {
        return "admin/users";
      } else if (url.includes("statuses")) {
        return "admin/statuses";
      } else if (url.includes("categories")) {
        return "admin/categories";
      } else if (url.includes("provinces")) {
        return "admin/provinces";
      }
    } else if (url.includes("/projects")) {
      return "projects";
    } else if (url.includes("/businesses")) {
      return "businesses";
    } else if (url.includes("/contacts")) {
      return "contacts";
    } else if (url.includes("/profile")) {
      return "profile";
    }
  };

  displayAdminMenu = user => {
    if (user.role === "admin") {
      let location = this.defineLocation()
      return (
        <div>
          <SideNavItem divider />
          <SideNavItem subheader>Admin</SideNavItem>
          <SideNavItem href="/admin/projects" icon="assignment_turned_in" className={location === "admin/projects" ? "link-active" :""}>
            Project Contributors
          </SideNavItem>
          <SideNavItem href="/admin/users" icon="group" className={location === "admin/users" ? "link-active" :""}>
            Manage Users
          </SideNavItem>
          <SideNavItem href="/admin/statuses" icon="star" className={location === "admin/statuses" ? "link-active" :""}>
            Manage Status
          </SideNavItem>
          <SideNavItem href="/admin/categories" icon="category" className={location === "admin/categories" ? "link-active" :""}>
            Manage Category
          </SideNavItem>
          <SideNavItem href="/admin/provinces" icon="museum" className={location === "admin/provinces" ? "link-active" :""}>
            Manage Provinces
          </SideNavItem>
        </div>
      );
    }
  };

  render() {
    const { user } = this.props;
    let location = this.defineLocation()

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

            <SideNavItem href="/businesses" icon="storefront" className={location === "businesses" ? "link-active" :""}>
              Business
            </SideNavItem>

            <SideNavItem href="/projects" icon="assignment_turned_in" className={location === "projects" ? "link-active" :""}>
              Projects
            </SideNavItem>

            <SideNavItem href="/contacts" icon="account_box" className={location === "contacts" ? "link-active" :""}>
              Contacts
            </SideNavItem>
            {this.displayAdminMenu(user)}
            <SideNavItem divider />
            <SideNavItem subheader>My Account</SideNavItem>
            <SideNavItem href="/profile/me" waves icon="person_pin" className={location === "profile" ? "link-active" :""}>
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
