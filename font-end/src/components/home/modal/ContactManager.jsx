import React, { Component } from 'react';
import { Modal, Button, Tabs, Icon, Badge } from 'antd';
import FindUser from '../helps/modal/FindUser';
import Contact from './../helps/modal/Contact';
import WaitConfirmation from './../helps/modal/WaitConfirmation';
import FriendRequest from './../helps/modal/FriendRequest';

const { TabPane } = Tabs;

class ContactManager extends Component {
  constructor(props){
    super(props);
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
                            <Badge count={100} overflowCount={99}></Badge>
                        </span>
                    }
                    key="2"
                    >
                    <Contact></Contact>
                </TabPane>

                <TabPane
                    tab={
                        <span className="tab-pane">
                            <Icon type="loading" />
                            Wait For Confirmation
                            <Badge count={100} overflowCount={99}></Badge>
                        </span>
                    }
                    key="3"
                    >
                    <WaitConfirmation></WaitConfirmation>
                </TabPane>

                <TabPane
                    tab={
                        <span className="tab-pane"> 
                            <Icon type="check" />
                            Friend Request
                            <Badge count={100} overflowCount={99}></Badge>
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

export default ContactManager;