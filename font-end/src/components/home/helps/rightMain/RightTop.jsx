import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Row,Col,Icon,List, Empty} from 'antd';
import axios from 'axios';
import config from './../../../../config/index';
import {Modal} from 'antd';
import Gallery from 'react-grid-gallery';
import {bufferToBase64} from './../../../../helpers/clientHelper';
import { func } from 'prop-types';
import { EMFILE } from 'constants';


function mapStateToProps(state) {
    return {

    };
}

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
            visibleImage: false,
            visibleFile: false
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
        axios({
            url: `${config.baseUrl}/message/image/list?messageId=${this.props.data._id}`,
            method: 'get'
        })
        .then((res)=>{
            this.setState({
                visibleImage: !this.state.visibleImage,
                listImage : res.data.map((item, index) => {
                    return coverImages(item)
                })
            })
        })
        .catch((err) => {
            console.log(err)
        })
    }

    handleModalFile = () =>{
        axios({
            url: `${config.baseUrl}/message/file/list?messageId=${this.props.data._id}`,
            method: 'get'
        })
        .then((res)=>{
            this.setState({
                visibleFile: !this.state.visibleFile,
                listFile : res.data
            })
        })
        .catch((err) => {
            console.log(err)
        })
    }

    render() {
        const data = this.props.data;
        return (
            <div className="top">
                <Row>
                    <Col span={8}>
                        To: <span><strong>{data.nickname? data.nickname : data.name}</strong></span>
                    </Col>
                    <Col span={3} offset={10}>
                    <div onClick={this.handleModalImage} style={{cursor: "pointer"}}>
                        Image
                        <Icon type="file-image" />
                        </div>
                    </Col>
                    <Col span={3}>
                    <div onClick={this.handleModalFile} style={{cursor: "pointer"}}>
                        File
                        <Icon type="paper-clip" />
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
                    {/** LIST image */}
                    {this.state.listImage.length>0 ? <Gallery images={this.state.listImage} /> : <Empty/>}
                </Modal>

                <Modal
                    className="modal-file"
                    title="All File"
                    width={"70vw"}
                    visible={this.state.visibleFile}
                    onOk={this.handleOpenModalFile}
                    onCancel={this.handleOpenModalFile}
                >
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
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
)(RightTop);