import React, { Component } from "react";
import { SideNavItem } from "react-materialize";
import { connect } from "react-redux";

import {logout } from "../../redux/actions/index";

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
        e.preventDefault()

        this.props.logout()
    };

    render() {
        const { user } = this.props;

        return (
            <div>
                {user.authenticated ? (
                    <div>
                        <SideNavItem
                            user={{
                                background:
                                    "https://source.unsplash.com/random/300x112",
                                    // "../img/gaelle-marcel-bay4zMs4zTc-unsplash.jpg",
                                email: user.email,
                                name: user.name
                            }}
                            userView
                        />
                        <SideNavItem
                            href='/projects'
                            icon='assignment_turned_in'

                        >
                            Projects
                        </SideNavItem>
                        <SideNavItem href='/businesses' icon='business'>
                            Business
                        </SideNavItem>
                        <SideNavItem href='/contacts' icon='account_box'>
                            Contacts
                        </SideNavItem>
                        <SideNavItem divider />
                        <SideNavItem subheader>My Account</SideNavItem>
                        <SideNavItem href='/profile/me' waves icon='person_pin'>
                            Profile
                        </SideNavItem>
                        <SideNavItem
                            href='/logout'
                            onClick={this.handleLogout}
                            waves
                            icon='power_settings_new'
                        >
                            Logout
                        </SideNavItem>
                    </div>
                ) : (
                    <div>
                        <SideNavItem
                            user={{
                                background:
                                    "img/jeremy-bishop-BuQ-jgeexaQ-unsplash.jpg",
                                email: "Beeblee",
                                name: ""
                            }}
                            userView
                        />
                        <SideNavItem href='/login' waves icon='trending_flat'>
                            Login
                        </SideNavItem>
                    </div>
                )}
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SideNavItems);
