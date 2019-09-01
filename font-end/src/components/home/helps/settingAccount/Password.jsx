import React, { Component } from 'react';
import {
  Form,
  Input,
  message,
  Button,
} from 'antd';
import axios from 'axios';
import config from './../../../../config/index';

class Password extends Component {
  constructor(props){
    super(props);
        this.state = {
            confirmDirty: false,
        };
    }
    handleSubmit = (e) => {
        e.preventDefault();
        let data = this.props.form.getFieldsValue();
        data.id = this.props.id
        axios({
            url: `${config.baseUrl}/user/update/password`,
            method : 'post',
            data: data
        })
        .then((response)=>{
            console.log(response)
            if(response.status === 200){
                message.success('Update password success!', 10);
                this.setState({
                    loading : false,
                    updateUser: data
                });
            }
        })
        .catch((error)=>{
            message.error(error.response.statusText, 10);
            this.props.form.resetFields();
        })
    };
    
    compareToFirstPassword = (rule, value, callback) => {
        const { form } = this.props;
        if (value && value !== form.getFieldValue('new_password')) {
            callback('Two passwords that you enter is inconsistent!');
        } else {
            callback();
        }
      };
    
    validateToNextPassword = (rule, value, callback) => {
        const { form } = this.props;
        let regexPassword = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})");
        if (value && this.state.confirmDirty) {
            form.validateFields(['confirm'], { force: true });
        }
        console.log(regexPassword.test(value));
        if (!regexPassword.test(value)){
            callback("Password no type")
        }
        callback();
      };
    
    render() {
        const { getFieldDecorator } = this.props.form;

        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 6 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 18 },
            },
        };
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                span: 24,
                offset: 0,
                },
                sm: {
                span: 18,
                offset: 6,
                },
            },
        };
        return (
            <div>
                <Form {...formItemLayout} onSubmit={this.handleSubmit}>
                    <Form.Item label="Current Password" >
                        {getFieldDecorator('cur_password', {
                            rules: [
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                            ],
                        })(<Input.Password />)}
                    </Form.Item>
                    <Form.Item label="New Password" hasFeedback>
                        {getFieldDecorator('new_password', {
                            rules: [
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                            {
                                validator: this.validateToNextPassword,
                            },
                            ],
                        })(<Input.Password />)}
                    </Form.Item>
                    <Form.Item label="Confirm Password" hasFeedback>
                        {getFieldDecorator('confirm', {
                            rules: [
                            {
                                required: true,
                                message: 'Please confirm your password!',
                            },
                            {
                                validator: this.compareToFirstPassword,
                            },
                            ],
                        })(<Input.Password />)}
                    </Form.Item>
                    
                    <Form.Item {...tailFormItemLayout}>
                        <Button type="primary" htmlType="submit">
                            Update
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        );
    }
}

export default Form.create({ name: 'updatePassword'})(Password);
