import React, { Component } from 'react';
import brand from './../../image/brand.png';
import avatar_default from './../../image/avatar-default.jpg';
import ContactManager from './modal/ContactManager';
import Notification from './modal/Notification';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem } from 'reactstrap';
import {Icon, Input, Dropdown, Menu} from 'antd';

const { Search } = Input;
// const menu = <Notification></Notification>;

class NavBar extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
        isOpen: false,
        openModalContact : false,
    };
  }
  toggle() {
    this.setState({
        isOpen: !this.state.isOpen
    });
  }
  openModalContact = () => {
      this.setState({
          openModalContact: !this.state.openModalContact
      })
  }
  render() {
    return (
        <div className="navbar-main">
            <Navbar className="container-fluid" light expand="md">
                <NavbarBrand href="/">
                    <img src={brand}></img></NavbarBrand>
                <NavbarToggler onClick={this.toggle} />
                <div className="input-search-navbar">
                    <Search
                        placeholder="input search text"
                        onSearch={value => console.log(value)}
                        style={{ width: 300 }}
                    />
                </div>
                <Collapse isOpen={this.state.isOpen} navbar>
                    <Nav className="ml-auto" navbar>
                    <NavItem>
                        <NavLink ><i className="fa fa-home "></i></NavLink>
                    </NavItem>
                    <NavItem onClick={this.openModalContact}>
                        <NavLink ><i className="fa fa-user-plus"></i></NavLink>
                    </NavItem>
                    <NavItem>
                            <NavLink ><i className="fa fa-globe "></i></NavLink>
                    </NavItem>

                    <UncontrolledDropdown nav inNavbar>
                        <DropdownToggle nav caret>
                            <img className="avatar-small" src={avatar_default} alt="avatar-default"></img>
                            &nbsp;UserName
                        </DropdownToggle>
                        <DropdownMenu right>
                        <DropdownItem>
                            <Icon type="setting" />
                            &nbsp;Setting
                        </DropdownItem>
                        <DropdownItem>
                            <Icon type="logout" />
                            &nbsp;Logout
                        </DropdownItem>
                        </DropdownMenu>
                    </UncontrolledDropdown>
                    </Nav>
                </Collapse>
                <div className="input-search col-12 my-3">
                    <Search
                        placeholder="input search text"
                        onSearch={value => console.log(value)}
                        style={{ width: 300 }}
                    />
                </div>
            </Navbar>
            <ContactManager open={this.state.openModalContact} close={this.openModalContact}></ContactManager>
            {/* <Notification></Notification> */}
        </div>
    );
  }
}

export default NavBar;
