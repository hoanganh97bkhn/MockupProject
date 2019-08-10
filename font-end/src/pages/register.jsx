import React, { Component } from 'react';
import Input from './../components/form/Input';
import Checkbox from './../components/form/Checkbox';
import NavBav from './../components/form/NavBav';
import * as actions from './../actions/index';
import {connect} from 'react-redux';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import config from './../config/index';

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
                username: "",
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
        console.log(this.props.auth.isAuthenticated);
        if(this.props.auth.isAuthenticated) {
            this.props.history.push('/');
        }
        // setTimeout(()=>{
        //     this.setState({
        //         modal: "open"
        //     })
        // },1500)
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

    // componentWillReceiveProps(){
    //     if(this.props.message.status === "error"){
            
    //         this.setState({
    //             arrayError: this.props.message.message,
    //             loading: false,
    //         })
    //     }
    //     else {
    //         this.setState({
    //             arraySuccess: this.props.message.message,
    //             loading: false
    //         })
    //     }
    // }

    componentWillReceiveProps(nextProps) {
        if(nextProps.auth.isAuthenticated) {
            this.props.history.push('/')
        }
        // if(nextProps.errors) {
        //     this.setState({
        //         errors: nextProps.errors
        //     });
        // }
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
        if(data.email === "" || data.username === "" || data.password === ""){
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
        else if(this.state.register.password != this.state.register.password_confirmation){
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


    render() {
        console.log(this.props.message)
        return (
        <div className="container">
            <NavBav openLogin={this.openLogin} openRegister={this.openRegister}></NavBav>
            <div id={this.state.modal} className="register">
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
                        <Input onChangeData={this.handleChangeRegister} type={"text"} dataPlaceholder={"Username"} name={"username"}></Input>
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
        }
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(withRouter (register));
