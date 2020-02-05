import React, { Component } from "react";
import { connect } from "react-redux";
import {Navbar, Icon} from "react-materialize"
function mapStateToProps(state) {
  return {};
}

class NavBar extends Component {
  render() {
    return (
      <div>
        <Navbar
          alignLinks="left"
          brand={
            <a className="brand-logo" href="#">
              Logo
            </a>
          }
          centerLogo
          menuIcon={<Icon>menu</Icon>}
          options={{
            draggable: true,
            edge: "left",
            inDuration: 250,
            onCloseEnd: null,
            onCloseStart: null,
            onOpenEnd: null,
            onOpenStart: null,
            outDuration: 200,
            preventScrolling: true
          }}
        >
          {/* <NavItem onClick={function noRefCheck() {}}>Getting started</NavItem>
          <NavItem href="components.html">Components</NavItem> */}
        </Navbar>
      </div>
    );
  }
}

export default connect(mapStateToProps)(NavBar);
