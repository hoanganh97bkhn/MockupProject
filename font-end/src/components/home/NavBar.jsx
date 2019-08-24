import React, { Component } from 'react';
import brand from './../../image/brand.png';
import avatar from './../../image/avatar-default.jpg';
import ContactManager from './modal/ContactManager';
import Notification from './modal/Notification';
import SettingAccount from './modal/SettingAccount';
import * as actions from './../../actions/index';
import {connect} from 'react-redux';
import axios from 'axios';
import config from './../../config/index';

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
import {Icon, Input, Dropdown, Badge} from 'antd';

const { Search } = Input;
let imageUrl = avatar;

class NavBar extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
        isOpen: false,
        openModalContact : false,
        openModalSetting : false,
        user : {
            avatar:'avatar-default.jpg',
            nickname : 'nickname'
        },
        imagePreview : '',
        openModalNotifi: false,
        badge: 0,
        listNotifi: [],
        listNotifiFromServer: []
    };
  }
    componentDidMount = () => {
        document.body.addEventListener('click', this.closeModalNotifi);
    }
    componentWillMount = () => {
        axios({
            url:`${config.baseUrl}/home/user`,
            method: 'post',
        })
        .then((response) => {
            if(response.data.user.avatar !== 'avatar-default.jpg'){
                imageUrl = config.baseUrl + '/images/' + response.data.user.avatar
            }
            else imageUrl = avatar;
            this.setState({
                user: response.data.user,
                listNotifiFromServer: response.data.notifications,
            })
            }
        )
        .catch((error)=>{
            console.log(error)
        }) 
    }
    componentWillReceiveProps = (nextProps) => {
        this.setState({
            listNotifi: nextProps.addContactSocket.concat(this.state.listNotifiFromServer)
        })
    }

    imagePreview = (data) => {
        this.setState({
            imagePreview : data
        })
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
    openModalSetting = () => {
        this.setState({
            openModalSetting: !this.state.openModalSetting
        })
    }
    openNotification = () => {
        this.props.resetNotifi();
        this.setState({
            openModalNotifi: true
        })
    }
    closeModalNotifi = () => {
        this.setState({
            openModalNotifi : false
        })
    }
    logoutUser = () => {
        this.props.logoutUser({});
        window.location.href = '/login-register'
    }
    render() {
        console.log(this.props.addContactSocket)
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
                        <Badge count={this.props.notifiSocket}>
                            <NavItem onClick={this.openModalContact}>
                                <NavLink ><i className="fa fa-user-plus"></i></NavLink>
                            </NavItem>
                        </Badge>
                        <Badge count={this.props.notifiSocket}>
                            <NavItem className="icon-notification" onClick={this.openNotification}>
                                <NavLink ><i className="fa fa-bell "></i></NavLink>
                                <Notification listSocket={this.state.listNotifi} open={this.state.openModalNotifi}></Notification>
                            </NavItem>
                        </Badge>
                        <UncontrolledDropdown nav inNavbar>
                            <DropdownToggle nav caret>
                                {this.state.imagePreview != '' ? 
                                    <img className="avatar-small" src = {this.state.imagePreview} alt="avatarPreview"></img> 
                                    :
                                    <img className="avatar-small" src = {imageUrl} alt="avatar-default"></img>
                                }
                                
                                &nbsp;{this.state.user.nickname}
                            </DropdownToggle>
                            <DropdownMenu right>
                            <DropdownItem onClick={this.openModalSetting}>
                                <Icon type="setting" />
                                &nbsp;Setting
                            </DropdownItem>
                            <DropdownItem onClick={this.logoutUser}>
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
                <SettingAccount open={this.state.openModalSetting} close={this.openModalSetting} user={this.state.user} imagePreviewUrl={this.imagePreview}></SettingAccount>
            </div>
        );
    }
    }

const mapStateToProps = (state) => {
  return {
        auth: state.login,
        notifiSocket: state.countNotifi,
        addContactSocket: state.addContact,
        socket: state.socket
  }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
          logoutUser : (data) => {
            dispatch(actions.logoutUser(data));
          },
          resetNotifi : ()=>{
              dispatch(actions.resetNotifi());
          }
    }
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
