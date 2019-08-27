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


const { TabPane } = Tabs;

class ContactManager extends Component {
    constructor(props){
        super(props);
        this.state = {
            contacts : [],
            contactsSent : [],
            contactsReceived : [],
            countAllContacts : 0,
            countAllContactsSent : 0,
            countAllContactsReceived : 0,
        }
    }

    componentDidMount = () => {
        axios({
            url: `${config.baseUrl}/contact/list`,
            method: 'GET',
          })
          .then((response) => {
            console.log(response.data)
            let {contacts, contactsSent, contactsReceived, countAllContacts, countAllContactsReceived, countAllContactsSent} = response.data;
            this.setState({
                contacts : contacts,
                contactsSent : contactsSent,
                contactsReceived : contactsReceived,
                countAllContacts : countAllContacts,
                countAllContactsReceived : countAllContactsReceived,
                countAllContactsSent : countAllContactsSent
            })
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
                maskClosable={true}
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
                        <FindUser></FindUser>
                    </TabPane>

                    <TabPane
                        tab={
                            <span className="tab-pane">
                                <Icon type="contacts" />
                                Contact
                                <Badge count={this.state.countAllContacts} overflowCount={99} style={{ backgroundColor: '#52c41a' }}></Badge>
                            </span>
                        }
                        key="2"
                        >
                        <Contact listData = {this.state.contacts}></Contact>
                    </TabPane>

                    <TabPane
                        tab={
                            <span className="tab-pane">
                                <Icon type="loading" />
                                Wait For Confirmation
                                <Badge count={this.state.countAllContactsSent} overflowCount={99}></Badge>
                            </span>
                        }
                        key="3"
                        >
                        <WaitConfirmation listData = {this.state.contactsSent}></WaitConfirmation>
                    </TabPane>

                    <TabPane
                        tab={
                            <span className="tab-pane" onClick={this.handleFriendRequest}> 
                                <Icon type="check" />
                                Friend Request
                                <Badge count={this.state.countAllContactsReceived} overflowCount={99}></Badge>
                            </span>
                        }
                        key="4"
                        >
                        <FriendRequest listData = {this.state.contactsReceived}></FriendRequest>
                    </TabPane>
                </Tabs>
            </Modal>
        </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
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

export default connect(mapStateToProps, mapDispatchToProps)(ContactManager);
  