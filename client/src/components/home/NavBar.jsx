import React, { Component } from 'react';
import brand from './../../image/brand.png';
import avatar from './../../image/avatar-default.jpg';
import ContactManager from './modal/ContactManager';
import SettingAccount from './modal/SettingAccount';
import SearchMessage from './../home/helps/searchMessage/SearchMessage';
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
import {Icon, Input, Badge} from 'antd';

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
            listNotifiFromServer: [],
            countGeneralNotif : 0,
            countContactNotif : 0,
            keyMessage : ""
        };
    }
    
    componentWillMount = () => {
        axios({
            url:`${config.baseUrl}/home/user`,
            method: 'get',
        })
        .then((response) => {
            this.props.getUser(response.data.user);
            //this.props.getICETurnServer(response.data.iceServerList);
            if(response.data.user.avatar !== 'avatar-default.jpg'){
                imageUrl = config.baseUrl + '/images/' + response.data.user.avatar
            }
            else imageUrl = avatar;
            this.setState({
                user: response.data.user,
                countGeneralNotif : response.data.generalNotif,
                countContactNotif : response.data.contactNotif,
            })
            }
        )
        .catch((error)=>{
            console.log(error)
        }) 
    }
    handleSearchConversation = (value)=>{
        this.setState({
            keyMessage : value
        })
    }

    resetKeyWord = ()=>{
        this.setState({
            keyMessage : ""
        })
    }

    handleReadMore = (data) => {
        this.setState({
            listNotifiFromServer : this.state.listNotifiFromServer.concat(data)
        })
    }
    markAllAsRead = () => {
        this.setState({
            listNotifiFromServer: this.state.listNotifiFromServer.map((item) => {
                return {
                    ...item,
                    isRead : true
                }
            })
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
    handleReloadHome = () => {
        window.location.reload();
    }
    openModalContact = () => {

        this.setState({
            openModalContact: !this.state.openModalContact,
        });
        
        if(!this.state.openModalContact){
            axios({
                url:`${config.baseUrl}/timer/count/notification-contact/reset`,
                method :'put'
            })
            .then((res)=>{
                this.setState({
                    countContactNotif: 0,
                });
                this.props.resetNotifi();
            })
            .catch((error) => {
                console.log(error)
            })
        }
    }
    openModalSetting = () => {
        this.setState({
            openModalSetting: !this.state.openModalSetting
        })
    }
    openNotification = (event) => {
        event.preventDefault();
        this.setState({
            openModalNotifi: true,
        }, () => {
            document.addEventListener('click', this.closeModalNotifi);
        });

        if(!this.state.listNotifiFromServer.length){
            axios({
                url:`${config.baseUrl}/notification/data/list`,
                method: 'get',
            })
            .then((res) => {
                this.setState({
                    countGeneralNotif: 0,
                    listNotifiFromServer: res.data.notifications,
                })
            })
            .catch((error) => {
                console.log(error)
            })
        }
        else if(this.props.notifiSocket){
            axios({
                url:`${config.baseUrl}/timer/count/notification-general/reset`,
                method: 'put',
            })
            .then((res) => {
                this.setState({
                    countGeneralNotif: 0,
                })
            })
            .catch((error) => {
                console.log(error)
            })
        }
        this.props.resetNotifi();
    }

    closeModalNotifi = (event) => {
        event.preventDefault();
        this.setState({
            openModalNotifi : false
        }, () => {
            document.removeEventListener('click', this.closeModalNotifi);
        })
    }
    
    logoutUser = () => {
        this.props.logoutUser({});
    }

    render() {
        // const listDataNotification = this.props.addContactSocket.concat(this.state.listNotifiFromServer);
        // const countGeneralNotif = this.props.notifiSocket + this.state.countGeneralNotif;
        const countContactNotif = this.props.notifiSocket + this.state.countContactNotif;
        return (
            <div className="navbar-main">
                <Navbar className="container-fluid" light expand="md">
                    <NavbarBrand href="/">
                        <img src={brand} alt={"brand-logo"}></img></NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />
                    <div className="input-search-navbar">
                        <Search
                            placeholder="input search text"
                            onSearch={value => this.handleSearchConversation(value)}
                            style={{ width: 300 }}
                        />
                        <SearchMessage keyword={this.state.keyMessage} resetKeyWord={this.resetKeyWord}/>
                    </div>
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                        <NavItem onClick={this.handleReloadHome}>
                            <NavLink ><i className="fa fa-home "></i></NavLink>
                        </NavItem>
                        <Badge count={this.props.countContactsReceived}>
                            <NavItem onClick={this.openModalContact}>
                                <NavLink ><i className="fa fa-user-plus"></i></NavLink>
                            </NavItem>
                        </Badge>
                        {/* <Badge count={countGeneralNotif}>
                            <NavItem className="icon-notification" onClick={this.openNotification}>
                                <NavLink ><i className="fa fa-bell "></i></NavLink>
                                <Notification readMore = {this.handleReadMore} listSocket={listDataNotification} open={this.state.openModalNotifi} markAllAsRead = {this.markAllAsRead}></Notification>
                            </NavItem>
                        </Badge> */}
                        <UncontrolledDropdown nav inNavbar>
                            <DropdownToggle nav caret>
                                {this.state.imagePreview !== '' ? 
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
                <ContactManager countBadge = {countContactNotif} open={this.state.openModalContact} close={this.openModalContact}></ContactManager>
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
        socket: state.socket,
        countContactsReceived: state.countContactsReceived,
  }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
          logoutUser : (data) => {
            dispatch(actions.logoutUser(data));
          },
          resetNotifi : ()=>{
              dispatch(actions.resetNotifi());
          },
          getUser : (data) => {
              dispatch(actions.getUser(data));
          },
          getICETurnServer : (data) => {
              dispatch(actions.getICETurnServer(data))
          }
    }
}
  
  export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
