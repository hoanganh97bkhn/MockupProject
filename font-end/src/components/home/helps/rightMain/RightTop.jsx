import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Row, Col, Icon, List, Empty, Spin, Button, message} from 'antd';
import axios from 'axios';
import config from './../../../../config/index';
import {Modal} from 'antd';
import Gallery from 'react-grid-gallery';
import {bufferToBase64} from './../../../../helpers/clientHelper';
import ModalMore from './ModalMore';
import * as actions from './../../../../actions/index';

function mapStateToProps(state) {
    return {

    };
}

const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;
const { confirm } = Modal;

function coverImages(item){
    return {
        src : `data:${item.file.contentType}; base64, ${bufferToBase64(item.file.data)}`,
        thumbnail: `data:${item.file.contentType}; base64, ${bufferToBase64(item.file.data)}`,
        thumbnailWidth: 280,
        thumbnailHeight: 174,
        caption: `${item.file.fileName}`
    }
}

class RightTop extends Component {
    constructor(props) {
        super(props);
        this.state={
            listImage : [],
            listFile : [],
            listInfo : [],
            visibleImage: false,
            visibleFile: false,
            visibleMore : false,
            loading: false,
            isEmpty : false,
            isAdmin : false
        }
    }

    handleOpenModalImage = e => {
        this.setState({
          visibleImage: !this.state.visibleImage,
        });
    };

    handleOpenModalFile = e => {
        this.setState({
          visibleFile: !this.state.visibleFile,
        });
    };

    handleModalImage = () =>{
        this.setState({
            visibleImage: !this.state.visibleImage,
            loading : true,
        })
        axios({
            url: `${config.baseUrl}/message/image/list?messageId=${this.props.data._id}`,
            method: 'get'
        })
        .then((res)=>{
            this.setState({
                loading: false,
                listImage : res.data.map((item, index) => {
                    return coverImages(item)
                }),
                isEmpty : res.data.length === 0 
            })
        })
        .catch((err) => {
            console.log(err);
            this.setState({
                loading :false
            })
        })
    }

    handleModalFile = () =>{
        this.setState({
            visibleFile: !this.state.visibleFile,
            loading : true,
        })

        axios({
            url: `${config.baseUrl}/message/file/list:messageId=${this.props.data._id}`,
            method: 'get'
        })
        .then((res)=>{
            this.setState({
                listFile : res.data,
                loading :false
            })
        })
        .catch((err) => {
            console.log(err);
            this.setState({
                loading :false
            })
        })
    }

    handleModalMore = ()=>{
        if(!this.state.visibleMore){
            this.setState({
                visibleMore : true,
                loading : true
            })
            axios({
                url: `${config.baseUrl}/group-chat/list-member?groupId=${this.props.data._id}`,
                method: 'get'
            })
            .then((res)=>{
                this.setState({
                    listInfo : res.data.listInfo,
                    isAdmin : res.data.isAdmin,
                    loading :false
                })
            })
            .catch((err) => {
                console.log(err);
                this.setState({
                    loading :false
                })
            })
        }
        else {
            this.setState({
                visibleMore : false
            })
        }
    }

    handleRemove = () => {
        if(!this.state.isAdmin){
            confirm({
                title : "Would you like leave to group?",
                onOk : ()=>{
                    axios({
                        url : `${config.baseUrl}/group-chat/leave-group`,
                        method: 'put',
                        data :{ groupId : this.props.data._id}
                    })
                    .then((res)=>{
                        this.props.removeListAllConversations(this.props.data._id);
                        this.props.removeListGroupConversations(this.props.data._id);
                        this.setState({
                            visibleMore : false
                        })
                    })
                    .catch((err) => {
                        console.log(err);
                        
                    })
                }
            })
        }
        else {
            message.error('Admin can not leave to group', 3);
        }
    }

    render() {
        const data = this.props.data;
        return (
            <div className="top">
                <Row>
                    <Col span={8}>
                        To: <span><strong>{data.nickname? data.nickname : data.name}</strong></span>
                    </Col>
                    <Col span={3} offset={7}>
                    <div onClick={this.handleModalImage} style={{cursor: "pointer", width: "50%"}}>
                        Image
                        <Icon type="file-image" />
                        </div>
                    </Col>
                    <Col span={3}>
                    <div onClick={this.handleModalFile} style={{cursor: "pointer",  width: "50%"}}>
                        File
                        <Icon type="paper-clip" />
                        </div>
                    </Col>
                    <Col span={3}>
                    <div onClick={this.handleModalMore} style={{cursor: "pointer",  width: "50%"}} >
                        More
                        <Icon type="ellipsis" />
                        </div>
                    </Col>
                </Row>
                <Modal
                    className="modal-image"
                    title="All Image"
                    width={"70vw"}
                    visible={this.state.visibleImage}
                    onOk={this.handleOpenModalImage}
                    onCancel={this.handleOpenModalImage}
                >
                    <div style={{textAlign : 'center', marginTop: '15px'}}><Spin indicator={antIcon} spinning={this.state.loading}/></div>
                    {/** LIST image */}
                    <Gallery images={this.state.listImage} />
                    {this.state.isEmpty ? <Empty/> : null}
                    
                </Modal>

                <Modal
                    className="modal-file"
                    title="All File"
                    width={"70vw"}
                    visible={this.state.visibleFile}
                    onOk={this.handleOpenModalFile}
                    onCancel={this.handleOpenModalFile}
                >
                    <div style={{textAlign : 'center', marginTop: '15px'}}><Spin indicator={antIcon} spinning={this.state.loading}/></div>
                    {/** LIST file */}
                    {this.state.listFile.length>0 ? 
                        <List
                            size="small"
                            bordered
                            dataSource={this.state.listFile}
                            renderItem={item => 
                            <List.Item>
                                <List.Item.Meta
                                    title={<a href={`data:${item.file.contentType}; base64, ${bufferToBase64(item.file.data)}`} download={ item.file.fileName}>
                                    { item.file.fileName }
                                    </a>}>
                                </List.Item.Meta>
                            </List.Item>}
                        /> : <Empty/>
                    }
                </Modal>
                    
                <Modal
                visible = {this.state.visibleMore}
                className="modal-more"
                title="Info Conversation"
                width={"65vw"}
                closable = {false}
                maskClosable={false}
                footer = {[
                    null, 
                    <Button key="1" type="danger" onClick={this.handleRemove}>Leave Group</Button>,
                    <Button key="2" type="primary" onClick={this.handleModalMore}>Ok</Button>,
                    ]}
                destroyOnClose = {true}
                >
                    <div style={{textAlign : 'center', marginTop: '15px'}}><Spin indicator={antIcon} spinning={this.state.loading}/></div>
                    {this.state.listInfo.length>0 ? <ModalMore listInfo={this.state.listInfo} isAdmin = {this.state.isAdmin} groupId = {this.props.data._id}/> : null}
                </Modal>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        removeListAllConversations : (data) => {
            dispatch(actions.removeListAllConversations(data))
        },
        removeListGroupConversations : (data) => {
            dispatch(actions.removeListGroupConversations(data))
        }
      }
  }

export default connect(
    mapStateToProps, mapDispatchToProps
)(RightTop);