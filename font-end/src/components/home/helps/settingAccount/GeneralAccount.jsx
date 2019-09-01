import React, { Component } from 'react';
import { Row, Col, Form, Icon, Input, Button, Select, Tooltip,Radio,message } from 'antd';
import axios from 'axios';
import config from './../../../../config/index';
import avatar from './../../../../image/avatar-default.jpg'

const { Option } = Select;
let imagesUrl = avatar;

class GeneralAccount extends Component {
    constructor(props){
        super(props);
        this.state = {
            updateUser : {
                prefix: '84',
                phone : ''
            },
            checkNick: false,
            imagePreviewUrl: '',
            fileimages : '',
            loading: false,
            iconLoading: false,
            keyInput : Date.now()
        };
    }
    componentWillMount = ()=>{
        console.log(this.props.user)
        if(this.props.user.avatar !== 'avatar-default.jpg')
            imagesUrl = `${config.baseUrl}/images/`+ this.props.user.avatar;
        else imagesUrl = avatar;
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
    handleBtnSubmit = (e) => {
        this.setState({
            loading : true,
        })
    }
    handleSubmit = (e) => {
        e.preventDefault();
        let formData = new FormData();
        let data = this.props.form.getFieldsValue();
        let currentData = this.state.updateUser;
        data = Object.assign(currentData, data)
        for ( var key in data ) {
            formData.append(key, data[key]);
        }
        formData.append('file',this.state.fileimages);
        axios({
            url: `${config.baseUrl}/user/info/update`,
            method : 'post',
            data: formData
        })
        .then((response)=>{
            console.log(response)
            if(response.status === 200){
                message.success('Update success!', 10);
                this.setState({
                    loading : false,
                    updateUser: data
                }, () => {
                    window.location.reload();
                });
                ;
            }
        })
        .catch((error)=>{
            console.log(error)
            message.error("Server error!", 10);
        })

    }
    handleReset = () => {
        this.props.form.resetFields();
        this.props.imagePreviewUrl('')
        this.setState({
            fileimages: '',
            imagePreviewUrl:  '',
            keyInput : Date.now()
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
    
        const { getFieldDecorator } = this.props.form;
        const prefixSelector = getFieldDecorator('prefix', {
            initialValue: this.state.updateUser.phone && this.state.updateUser.phone.split(')')[0].split('(')[1] ? this.state.updateUser.phone.split(')')[0].split('(')[1] : this.state.updateUser.prefix,
        })(
            <Select style={{ width: 70 }}>
            <Option value="86">+86</Option>
            <Option value="84">+84</Option>
            </Select>,
        );
        const prefixEmail = getFieldDecorator('email', {
            initialValue: this.state.updateUser.local.email,
        });
        const prefixNickname = getFieldDecorator('nickname', {
            initialValue: this.state.updateUser.nickname
        })
        const prefixPhone = getFieldDecorator('phone', {
            initialValue: this.state.updateUser.phone && this.state.updateUser.phone.split(')')[1] ? this.state.updateUser.phone.split(')')[1] : this.state.updateUser.phone,
        });
        const prefixAddress = getFieldDecorator('address', {
            initialValue: this.state.updateUser.address ? this.state.updateUser.address : '',
        });
        const prefixGender = getFieldDecorator('gender', {
            initialValue: this.state.updateUser.gender,
        });
        console.log(this.state.updateUser.nickname)
    return (
      <div>
            <Row>
                <Col id="seting-profile" md={6}>
                    <div className="text-center" id="div-update-avatar">
                        <div id="image-edit-profile">
                            <img src={this.state.imagePreviewUrl != '' ? this.state.imagePreviewUrl : imagesUrl} className="avatar img-circle" alt="avatar"></img>
                        </div>
                        <h6> Upload new image...</h6>
                        <input onChange={this.handleImageChange} type="file" key={this.state.keyInput} className="form-control" id="input-change-avatar" name="avatar"></input><br></br>
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
                                <Radio.Group value={prefixGender}>
                                <Radio value="male">Male</Radio>
                                <Radio value="female">Female</Radio>
                                </Radio.Group>,
                            )}
                        </Form.Item>
                        <Form.Item label="Phone Number">
                            {getFieldDecorator('phone', {
                                rules: [{ required: false, message: 'Please input your phone number!' }],
                            })(<Input defaultValue={prefixPhone} addonBefore={prefixSelector} style={{ width: '100%' }} />)}
                        </Form.Item>
                        <Form.Item label="Address">
                            {getFieldDecorator('address') (<Input defaultValue={prefixAddress}/>)}
                        </Form.Item>
                        <Form.Item wrapperCol={{ div: 14, offset: 8 }}>
                            <Button type="primary" htmlType="submit" onClick={this.handleBtnSubmit}  loading={this.state.loading}>
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
