import React, { Component } from 'react';
import { Modal, Button, Tabs, Icon, Input } from 'antd';
import GeneralAccount from './../helps/settingAccount/GeneralAccount';
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
            title="Personal Account"
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
                            <Icon type="setting" />
                            General Account Settings
                        </span>
                    }
                    key="1"
                    >
                    <GeneralAccount imagePreviewUrl={this.props.imagePreviewUrl} user={this.props.user}></GeneralAccount>
                </TabPane>

                <TabPane
                    tab={
                        <span className="tab-pane">
                            <Icon type="key" />
                            Password
                        </span>
                    }
                    key="2"
                    >
                    
                </TabPane>
            </Tabs>
        </Modal>
      </div>
    );
  }
}

export default ContactManager;