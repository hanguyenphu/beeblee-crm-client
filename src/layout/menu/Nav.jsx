import React, { Component } from "react"

import {
    Navbar,

    Icon,

} from "react-materialize"
import SideMenu from "./SideMenu"
import SideNavItems from './SideNavItems'



class Nav extends Component {
    render() {
        return (
            <Navbar
                alignLinks='left'
                className="gradient-nav"
                fixed={true}
                brand={
                    <a   className='brand-logo center' href='#'>
                        Beeblee
                    </a>
                }
                children = {<SideMenu/>}
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
                sidenav={
                    <SideNavItems/>
                }
            >
            </Navbar>
        );
    }
}

export default Nav;
