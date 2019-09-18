import React, { Component } from 'react';
import Input from './../components/form/Input';
import Checkbox from './../components/form/Checkbox';
import NavBar from '../components/form/NavBar';
import FacebookLogin from 'react-facebook-login';
import * as actions from './../actions/index';
import {connect} from 'react-redux';
import { withRouter } from 'react-router-dom';
import {message} from 'antd';
import axios from 'axios';
import config from './../config/index';
import { element } from 'prop-types';

class register extends Component {
    constructor(props){
        super(props);
        this.state = {
            login:{
                email: "",
                password: ""
            },
            register:{
                email: "",
                nickname: "",
                password: "",
                password_confirmation: "",
                gender: "male",
            },
            modal: "close",
            modalRegister: "close",
            arrayError : [],
            arraySuccess: [],
            loading: false,
        }
    }

    componentDidMount = ()=>{
        if(this.props.auth.isAuthenticated) {
            this.props.history.push('/');
        }
        this.setState({
            modal: "open"
        })
    }
    componentWillMount = ()=>{
        const pathname = this.props.location.pathname;
        const token = pathname.split('/')[pathname.split('/').length - 1];
        if(token !== 'login-register'){
            axios({
                url: `${config.baseUrl}/verify/${token}`,
                method: 'get'
            })
            .then((res)=>{
                if(res.status === 200){
                    this.props.history.push('/home');
                }
            });
        }
    }

    componentWillReceiveProps = (nextProps)=>{
        if(nextProps.auth.type === "error"){
            this.setState({
                loading : false
            },()=>{
                message.error(nextProps.auth.message,5);
            })
        } 
        else if(nextProps.auth.isAuthenticated) {
            this.props.history.push('/');
        }
        if(nextProps.message.type === "error"){
            this.setState({
                loading: false,
            },()=>{
                nextProps.message.message.forEach(element => {
                    message.error(element,5);
                })
            })
        }
        else if(nextProps.message.type === "success") {
            this.setState({
                loading: false
            },()=>{
                message.success("Register success, please go to email and confirm ",5);
            })
        }
    }

    handleChangeLogin = (name, data) => {
        this.setState({
            login : {
                ...this.state.login,
                [name]: data
            }
        })
    }

    handleChangeRegister = (name, data) =>{
        this.setState({
            register:{
                ...this.state.register,
                [name]: data
            }
        })
    }

    handleChangeGender = (data) => {
        this.setState({
            register:{
                ...this.state.register,
                gender: data
            }
        })
    }

    closeModal = ()=>{
        this.setState({
            modal: "close"
        })
    }

    closeModalRegister = ()=>{
        this.setState({
            modalRegister: "close"
        })
    }

    openLogin = ()=>{
        this.setState({
            modal: "open",
            modalRegister: "close",
            arrayError: []
        })
    }

    isCheckData = ()=>{
        let data = this.state.register;
        if(data.email === "" || data.nickname === "" || data.password === ""){
            return false;
        }
        return true;
    }

    openRegister = ()=>{
        this.setState({
            modal: "close",
            modalRegister: "open",
            arrayError: []
        })
    }

    onSubmitRegister = (e)=>{
        e.preventDefault();
        if(!this.isCheckData()){
            this.setState({
                arrayError: ["Empty the field!"]
            })
        }
        else if(this.state.register.password !== this.state.register.password_confirmation){
            this.setState({
                arrayError: ["Retype the wrong password"]
            })
        }
        else  {
            this.props.register(this.state.register);
            this.setState({
                arrayError: [],
                loading: true
            })
        }
    }

    onSubmit = (e) => {
        e.preventDefault();
        this.props.login(this.state.login);
        this.setState({
            arrayError: [],
            loading: true
        })
    }
    responseFacebook = (data) => {
        this.props.loginFB(data);
    }


    render() {
        return (
        <div className="register">
            <div className="container">
                <NavBar openLogin={this.openLogin} openRegister={this.openRegister}></NavBar>
                <div id={this.state.modal} className="">
                    <div id="login-register">
                        <form className="login-form" onSubmit={this.onSubmit}>
                            <button onClick={this.closeModal} type="button" className="close">&times;</button>
                            <h1>Login</h1>
                            <Input onChangeData={this.handleChangeLogin} type={"email"} dataPlaceholder={"Email"} name={"email"}></Input>
                            <Input onChangeData={this.handleChangeLogin} type={"password"} dataPlaceholder={"Password"} name={"password"}></Input>
                            <button type="submit" className="btn btn-primary logbtn" disabled={this.state.loading}>
                                Login  
                                {this.state.loading ? 
                                <span className="ml-1 spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                : null}
                            </button>
                            <FacebookLogin
                                appId="694327911031351" //APP ID NOT CREATED YET
                                fields="name,email,picture"
                                scope="public_profile"
                                callback={this.responseFacebook}
                                cssClass="fb-login"
                                icon="fa-facebook"
                            />    
                            {/* {this.state.arrayError.length>0 ? this.state.arrayError.map((item, index)=>(
                                <div key={index} className="notification">{item}</div>
                            )) : null} */}
                            
                            <div className="bottom-text">
                                Don't have account? <a onClick={this.openRegister}>Register</a>
                            </div>
                        </form>
                    </div>
                </div>
                <div id={this.state.modalRegister} className="register box-register">
                    <div id="login-register">
                        <form className="login-form" onSubmit={this.onSubmitRegister}>
                            <button onClick={this.closeModalRegister} type="button" className="close">&times;</button>
                            <h1>Register</h1>
                            <Input onChangeData={this.handleChangeRegister} type={"text"} dataPlaceholder={"Nickname"} name={"nickname"}></Input>
                            <Input onChangeData={this.handleChangeRegister} type={"email"} dataPlaceholder={"Email"} name={"email"} ></Input>
                            <Input onChangeData={this.handleChangeRegister} type={"password"} dataPlaceholder={"Password"} name={"password"}></Input>
                            <Input onChangeData={this.handleChangeRegister} type={"password"} dataPlaceholder={"Re-Password"} name={"password_confirmation"}></Input>
                            <div className="gender">
                                <Checkbox changeGender={this.handleChangeGender} name={"male"} title={"Male"} check={this.state.register.gender}></Checkbox>
                                <Checkbox changeGender={this.handleChangeGender} name={"female"} title={"Female"} check={this.state.register.gender}></Checkbox>
                            </div>

                            <button type="submit" className="btn btn-primary logbtn" disabled={this.state.loading}>
                                Register  
                                {this.state.loading ? 
                                <span className="ml-1 spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                : null}
                            </button>
                            {this.state.arrayError.map((item, index)=>(
                                <div  key={index} className="notification">{item}</div>
                            ))}
                            {this.state.arraySuccess.map((item, index)=>(
                                <div key={index} className="notificationSuccess">{item}</div>
                            ))}
                            
                            <div className="bottom-text">
                                Do have account? <a onClick={this.openLogin}>Sing up</a>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.login,
        message: state.register
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        register : (data) => {
            dispatch(actions.register(data))
        },
        login : (data) => {
            dispatch(actions.login(data))
        },
        loginFB: (data) => {
            dispatch(actions.loginFB(data))
        }
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(withRouter (register));
