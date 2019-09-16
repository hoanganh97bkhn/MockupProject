import React, { Component } from 'react';
import InfoContact from'./../../helps/modal/InfoContact';
import { Input, notification, Spin, Icon, Col, Row , Empty, Button, Modal, message, Form} from 'antd';
import { max } from 'moment';
import axios from 'axios';
import {connect} from 'react-redux';
import config from './../../../../config/index';
import * as actions from './../../../../actions/index'

const {Search} = Input;
const { confirm } = Modal;
const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;

const openNotification = (type, content) => {
  notification[type]({
    message: 'Notification',
    description: content,
    duration: 3
  });
};

class ModalCreateGroupChat extends Component {
    constructor(props){
        super(props);
        this.state={
            listUser : [],
            listMembers : [],
            arrayIds : [],
            loading : false,
            isEmpty : false,
            groupChatName : '',
            loadingCreate : false
        }
    }

    handleSearch = (e) => {
        const keyword = e.target.value;
        const regexKeyword = new RegExp(/^[\s0-9a-zA-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ ]+$/);

        if(keyword.length){
            this.setState({
                loading : true,
                isEmpty : false
            })
        }
        if(keyword !== ''){
            if(!regexKeyword.test(keyword)){
                openNotification('error', 'Keyword error!');
                this.setState({
                    loading : false,
                    isEmpty : true
                })
                return false
            }
            
            axios({
                url: `${config.baseUrl}/contact/search-friends/${keyword}`,
                method: 'get',
            })
            .then((res)=>{
                let arr = res.data.filter(item => {
                    if(this.state.arrayIds.indexOf(item._id) > -1){
                        return false;
                    }
                    return true;
                })
                this.setState({
                    listUser: arr,
                    loading : false,
                    isEmpty : !arr.length > 0 ? true : false
                })
            })
            .catch((error)=>{
                console.log(error);
                this.setState({
                    loading : false,
                    isEmpty : true
                })
            })
        }
    }

    handleAddToGroupChat = (item, index) => {
        this.setState({
            listUser : this.state.listUser.filter((ite, i)=>{
                if(i === index) return false;
                else return true
            }),
            listMembers : [...this.state.listMembers, item],
            arrayIds : [...this.state.arrayIds, item._id]
        })
    }

    validateGroupChatName = (rule, value, callback) => {
        const regexKeyword = new RegExp(/^[\s0-9a-zA-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ ]+$/);
        if (!regexKeyword.test(value)){
            callback("Name group chat is invalid")
        }
        callback();
    };

    handleNameGrChat = (e)=>{
        this.setState({
            groupChatName : e.target.value
        })
    }

    handleCancel = () => {
        this.setState({
            listMembers : [],
            arrayIds : []
        })
    }

    handleCreateGroup = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if(err) {
                console.log('error');
                return false;
            }
            else {
                confirm({
                    title: 'Do you want create group?',
                    onOk : ()=>{
                        this.setState({
                            loadingCreate : true
                        });

                        axios({
                            url : `${config.baseUrl}/group-chat/add-new`,
                            method : 'post',
                            data : {
                                arrayIds : this.state.arrayIds,
                                groupChatName : this.state.groupChatName
                            }
                        })
                        .then((res)=>{
                            message.success(`Created group ${res.data.name} success!`, 3);
                            this.props.addListAllConversations(res.data);
                            this.props.addListGroupConversations(res.data);
                            this.props.socket.emit('add-message-after-create-group-chat', res.data);
                            this.setState({
                                listUser: [],
                                listMembers : [],
                                arrayIds : [],
                                loadingCreate : false
                            })
                        })
                        .catch((err)=>{
                            this.setState({
                                loadingCreate : false
                            })
                            message.error('Error Server!');
                        })
                    },
                });
            }
        });
        
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div>
                <Row>
                    <Col span={9} className="list-data">
                        <Search
                        placeholder="Input nickname or email"
                        onChange={e => this.handleSearch(e)}
                        style={{ width: max}}
                        size="large"
                        />
                        <div id="style-contatcs" className="find-user-bottom">
                            {this.state.loading?<div style={{textAlign : 'center', marginTop: '5px'}}><Spin indicator={antIcon} /></div>:null}
                            {this.state.isEmpty ? 
                                <div><Empty image={Empty.PRESENTED_IMAGE_SIMPLE} /></div>
                                :null    
                            }
                            <ul className="contactList">
                            {this.state.listUser.length > 0 ? 
                                this.state.listUser.map((item, index)=>{
                                return (
                                    <InfoContact 
                                    clickSuccess={()=>this.handleAddToGroupChat(item, index)} 
                                    key={index} avatar={`${config.baseUrl}/images/${item.avatar}`} 
                                    titleSuccess={"Add to group"} 
                                    titleDanger = {""} 
                                    nickname={item.nickname} 
                                    address={item.address}>

                                    </InfoContact>
                                )
                                })  
                            : null }
                            </ul>
                        </div>
                    </Col>
                    <Col className='right-list-members list-data' span={14} offset={1}>
                        {this.state.listMembers.length > 0 ? 
                            this.state.listMembers.map((item, index)=>{
                            return (
                                <InfoContact 
                                clickSuccess={()=>this.handleAddToGroupChat(item, index)} 
                                key={index} avatar={`${config.baseUrl}/images/${item.avatar}`} 
                                titleSuccess={"Add to group"} 
                                titleDanger = {""} 
                                nickname={item.nickname} 
                                address={item.address}>

                                </InfoContact>
                            )
                            })  
                        : null }
                        {this.state.listMembers.length >1 ? 
                            <Form onSubmit={this.handleCreateGroup}>
                                <div style={{marginTop : '25px'}}>
                                    <Form.Item label="New Password" hasFeedback>
                                        {getFieldDecorator('group-chat-name', {
                                                rules: [
                                                    {
                                                        validator: this.validateGroupChatName,
                                                    },
                                                    {
                                                        required: true,
                                                        message: 'Please input your name group!',
                                                    },
                                                ],
                                            })(<Input
                                                className="input-name-group"
                                                placeholder={"Type name group chat ..."}
                                                onChange={this.handleNameGrChat}
                                                
                                        />)}
                                    </Form.Item>
                                    {this.state.groupChatName.length > 5 && this.state.groupChatName.length < 25 ?
                                    <div style={{textAlign : 'center'}}>
                                        <Form.Item>
                                            <Button type="primary" htmlType="submit" loading = {this.state.loadingCreate}> Create </Button>
                                            <Button type="danger" onClick={this.handleCancel} > Cancel </Button>
                                        </Form.Item>
                                    </div>
                                    :null}
                                </div>
                            </Form>
                        : null}
                    </Col>
                </Row>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
  return {
      socket: state.socket,
      contacts : state.contacts,
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
        addListAllConversations : (data) => {
            dispatch(actions.addListAllConversations(data))
        },
        addListGroupConversations : (data) => {
            dispatch(actions.addListGroupConversations(data))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Form.create({ name: 'updatePassword'})(ModalCreateGroupChat));
