import React, { Component } from 'react';
import { Modal, Tabs, Icon, Badge } from 'antd';
import FindUser from '../helps/modal/FindUser';
import Contact from './../helps/modal/Contact';
import WaitConfirmation from './../helps/modal/WaitConfirmation';
import FriendRequest from './../helps/modal/FriendRequest';
import {connect} from 'react-redux';
import axios from 'axios';
import config from './../../../config/index';
import * as actions from './../../../actions/index';
import { tsImportEqualsDeclaration } from '@babel/types';


const { TabPane } = Tabs;

class ContactManager extends Component {
    constructor(props){
        super(props);
        this.state = {
            removeFindUser : []
        }
    }

    componentDidMount = () => {
        axios({
            url: `${config.baseUrl}/contact/list`,
            method: 'GET',
          })
          .then((response) => {
            let {contacts, contactsSent, contactsReceived, countAllContacts, countAllContactsReceived, countAllContactsSent} = response.data;
            this.props.getListContacts(contacts);
            this.props.getListContactsSent(contactsSent);
            this.props.getListContactsReceived(contactsReceived);

            //count
            this.props.countListContacts(countAllContacts);
            this.props.countListContactsSent(countAllContactsSent);
            this.props.countListContactsReceived(countAllContactsReceived);
          })
          .catch((error)=> {
            console.log(error)
          })
    }

    render() {
        return (
        <div>
            <Modal
                className="modal-contact"
                title="Contact Management"
                visible={this.props.open}
                onCancel={this.props.close}
                footer={null}
                maskClosable={false}
                width={750}
            >
                <Tabs defaultActiveKey="1">
                    <TabPane
                        tab={
                            <span className="tab-pane">
                                <Icon type="search" />
                                Find User
                            </span>
                        }
                        key="1"
                        >
                        <FindUser removeFindUser={this.state.removeFindUser}></FindUser>
                    </TabPane>

                    <TabPane
                        tab={
                            <span className="tab-pane">
                                <Icon type="contacts" />
                                Contact
                                <Badge count={this.props.countContacts} overflowCount={99} style={{ backgroundColor: '#52c41a' }}></Badge>
                            </span>
                        }
                        key="2"
                        >
                        <Contact closeModal = {this.props.close}></Contact>
                    </TabPane>

                    <TabPane
                        tab={
                            <span className="tab-pane">
                                <Icon type="loading" />
                                Wait For Confirmation
                                <Badge count={this.props.countContactsSent} overflowCount={99}></Badge>
                            </span>
                        }
                        key="3"
                        >
                        <WaitConfirmation></WaitConfirmation> 
                    </TabPane>

                    <TabPane
                        tab={
                            <span className="tab-pane" onClick={this.handleFriendRequest}> 
                                <Icon type="check" />
                                Friend Request
                                <Badge count={this.props.countContactsReceived} overflowCount={99}></Badge>
                            </span>
                        }
                        key="4"
                        >
                        <FriendRequest></FriendRequest>
                    </TabPane>
                </Tabs>
            </Modal>
        </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        socket: state.socket,
        countContacts: state.countContacts,
        countContactsSent: state.countContactsSent,
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
            getListContacts : (data)=>{
                dispatch(actions.getListContacts(data));
            },
            getListContactsSent : (data)=>{
                dispatch(actions.getListContactsSent(data));
            },
            getListContactsReceived : (data)=>{
                dispatch(actions.getListContactsReceived(data));
            },
            countListContacts : (data)=>{
                dispatch(actions.countListContacts(data));
            },
            countListContactsSent : (data)=>{
                dispatch(actions.countListContactsSent(data));
            },
            countListContactsReceived : (data)=>{
                dispatch(actions.countListContactsReceived(data));
            },
      }
  }

export default connect(mapStateToProps, mapDispatchToProps)(ContactManager);
  