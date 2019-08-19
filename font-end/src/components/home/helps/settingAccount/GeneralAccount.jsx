import React, { Component } from 'react';
import { Row, Col, Form, Icon, Input, Button, Select, Tooltip,Radio,message } from 'antd';
import axios from 'axios';
import config from './../../../../config/index';
import avatar from './../../../../image/avatar-default.jpg'

const { Option } = Select;

class GeneralAccount extends Component {
    constructor(props){
        super(props);
        this.state = {
            updateUser : {},
            checkNick: false,
            imagePreviewUrl: '',
            fileimages : '',
            loading: false,
            iconLoading: false,
        };
    }
    componentWillMount = ()=>{
        console.log(this.props.user)
        this.setState({
            updateUser: this.props.user
        })
    }
    handleImageChange = (e) => {
        e.preventDefault();
        let reader = new FileReader();
        let file = e.target.files[0];
        if(file){
            reader.readAsDataURL(file);
            reader.onloadend = () => {
                this.props.imagePreviewUrl(reader.result);
                this.setState({
                    fileimages: file,
                    imagePreviewUrl:  reader.result,
            });
        }
        }
    }
    handleSubmit = (e) => {
        e.preventDefault();
        let formData = new FormData();
        let data = this.props.form.getFieldsValue();
        let currentData = this.state.updateUser;
        data = Object.assign(data, currentData)

        for ( var key in data ) {
            formData.append(key, data[key]);
        }
        
        formData.append('file',this.state.fileimages);
        this.setState({
            loading : false,
            updateUser: data
        })

        axios({
            url: `${config.baseUrl}/info/user/update`,
            method : 'post',
            data: formData
        })
        .then((response)=>{
            console.log(response);
        })
        .catch((error)=>{
            console.log(error)
        })

    }
    handleReset = (e) => {
        this.props.form.resetFields();
        this.props.imagePreviewUrl('')
        this.setState({
            fileimages: '',
            imagePreviewUrl:  ''
        });
    }
    render() {
        const formItemLayout = {
            labelCol: {
            xs: { span: 24 },
            sm: { span: 8 },
            },
            wrapperCol: {
            xs: { span: 24 },
            sm: { span: 16 },
            },
        };
        const formTailLayout = {
            labelCol: { span: 4 },
            wrapperCol: { span: 8, offset: 4 },
        };
        const { getFieldDecorator } = this.props.form;
        const prefixSelector = getFieldDecorator('prefix', {
            initialValue: '86',
        })(
            <Select style={{ width: 70 }}>
            <Option value="86">+86</Option>
            <Option value="87">+87</Option>
            </Select>,
        );
        const prefixEmail = getFieldDecorator('email', {
            initialValue: 'hoanganh.hn0301@gmail.com',
        });

        const prefixNickname = getFieldDecorator('nickname', {
            initialValue: this.state.updateUser.nickname
        })
        
        console.log(this.state.updateUser.nickname)
    return (
      <div>
            <Row>
                <Col id="seting-profile" md={6}>
                    <div className="text-center" id="div-update-avatar">
                        <div id="image-edit-profile">
                            <img src={this.state.imagePreviewUrl != '' ? this.state.imagePreviewUrl : avatar} className="avatar img-circle" alt="avatar"></img>
                        </div>
                        <h6> Upload new image...</h6>
                        <input onChange={this.handleImageChange} type="file" className="form-control" id="input-change-avatar" name="avatar"></input><br></br>
                        <div id="show-button-update-avatar"></div>
                    </div>
                </Col>
                <Col md={18}>
                    <Form {...formItemLayout} onSubmit={this.handleSubmit} >
                        <Form.Item
                            label={
                                <span>
                                Nickname&nbsp;
                                <Tooltip title="What do you want others to call you?">
                                    <Icon type="question-circle-o" />
                                </Tooltip>
                                </span>
                            }
                            >
                            {getFieldDecorator('nickname', {
                                rules: [{ required: true, message: 'Please input your nickname!', whitespace: true }],
                            })(<Input defaultValue={prefixNickname}/>)}
                        </Form.Item>
                        <Form.Item label="Email" >
                            {getFieldDecorator('email', {
                                rules: [{ required: true, message: 'Please input your nickname!', whitespace: true }],
                            })(<Input defaultValue={prefixEmail} disabled={true}/>)}
                        </Form.Item>
                        <Form.Item label="Gender">
                            {getFieldDecorator('gender')(
                                <Radio.Group>
                                <Radio value="male">Male</Radio>
                                <Radio value="female">Female</Radio>
                                </Radio.Group>,
                            )}
                        </Form.Item>
                        <Form.Item label="Phone Number">
                            {getFieldDecorator('phone', {
                                rules: [{ required: false, message: 'Please input your phone number!' }],
                            })(<Input addonBefore={prefixSelector} style={{ width: '100%' }} />)}
                        </Form.Item>
                        <Form.Item label="Address">
                            {getFieldDecorator('address') (<Input />)}
                        </Form.Item>
                        <Form.Item wrapperCol={{ div: 14, offset: 8 }}>
                            <Button type="primary" htmlType="submit"  loading={this.state.loading}>
                                Submit
                            </Button>
                            <Button onClick={this.handleReset} type="danger" ghost>
                                Reset
                            </Button>
                        </Form.Item>
                    </Form>
                </Col>
            </Row>
      </div>
    );
  }
}

export default Form.create({ name: 'update'})(GeneralAccount);