import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Input, Spin, Icon, Col, Row , Empty, Button, Modal, notification, message} from 'antd';
import { max } from 'moment';
import config from './../../../../config/index';
import InfoContact from './../../helps/modal/InfoContact';
import axios from 'axios';
import * as actions from './../../../../actions/index';

const {Search} = Input;
const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;

const openNotification = (type, content) => {
    notification[type]({
        message: 'Notification',
        description: content,
        duration: 3
    });
};


function mapStateToProps(state) {
    return {
        socket : state.socket
    };
}

class ModalMore extends Component {
    constructor(props){
        super(props);
        this.state = {
            listUser : [],
            listMembers : [],
            arrayIds : [],
            loading : false,
            isEmpty : false,
            groupId : ''
        }
    }

    componentDidMount = () => {
        this.setState({
            listMembers : this.props.listInfo,
            arrayIds : this.props.listInfo.map((item) => {
                return item._id
            }),
            groupId : this.props.groupId
        })
    }

    componentWillReceiveProps = (nextProps) => {
        this.setState({
            listMembers : nextProps.listInfo,
            arrayIds : nextProps.listInfo.map((item) => {
                return item._id
            }),
            groupId : nextProps.groupId
        })
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
        axios({
            url : `${config.baseUrl}/group-chat/add-memebers`,
            method : 'PUT',
            data : {
                groupId : this.state.groupId,
                memeberId : item._id
            }
        })
        .then ((res)=>{
            this.props.socket.emit("add-member-to-group", {uid: item._id, data : res.data});
            this.setState({
                listUser : this.state.listUser.filter((ite, i)=>{
                    if(i === index) return false;
                    else return true
                }),
                listMembers : [...this.state.listMembers, item],
                arrayIds : [...this.state.arrayIds, item._id]
            })
        })
        .catch((error)=>{
            console.log(error);
            message.error('Server Error!');
        })
    }

    handleRemove = (item, index) => {
        axios({
            url : `${config.baseUrl}/group-chat/remove-memebers`,
            method : 'PUT',
            data : {
                groupId : this.state.groupId,
                memeberId : item._id
            }
        })
        .then ((res)=>{
            this.props.socket.emit("remove-member-to-group", {uid: item._id, groupId : this.props.groupId});
            this.setState({
                listMembers : this.state.listMembers.filter((ite, i) => {
                    if( i === index) return false;
                    return true
                }),
                arrayIds : this.state.arrayIds.filter((ite, i) => {
                    if( i === index) return false;
                    return true
                })
            })
        })
        .catch((error)=>{
            console.log(error);
            message.error('Server Error!');
        })
    }

    render() {
        console.log(this.state.listMembers)
        return (
            <div>
                <Row>
                    <Col className="list-data" span={9}>
                        <div style={{marginBottom :'20px', fontWeight : 'bold'}}>Add member to group</div>
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
                        <div style={{marginBottom :'20px', fontWeight : 'bold'}}>{this.state.listMembers.length} members</div>
                        {this.state.listMembers.length > 0 ? 
                            this.state.listMembers.map((item, index)=>{
                            return (
                                <InfoContact 
                                    clickDanger={()=> this.handleRemove(item, index)}
                                    key={index} avatar={`${config.baseUrl}/images/${item.avatar}`} 
                                    titleSuccess={""} 
                                    titleDanger = {this.props.isAdmin && index !=0 ? "Delete" : ""}
                                    nickname={item.nickname} 
                                    address={item.address}>

                                </InfoContact>
                            )
                            })  
                        : null }
                    </Col>
                </Row>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        
      }
  }

export default connect(
  mapStateToProps, mapDispatchToProps
)(ModalMore);