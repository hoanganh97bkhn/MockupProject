import React, { Component } from 'react';
import '../node_modules/font-awesome/css/font-awesome.min.css'; 
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import 'antd/dist/antd.css';
import 'emoji-mart/css/emoji-mart.css';
import jwt_decode from 'jwt-decode';
import setAuthToken from './setAuthToken';
import {connect} from 'react-redux';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';
import * as actions from './actions/index';
import Home from './pages/home';
import Register from './pages/register';
import './App.css';
import './AppResponsive.css';
import io from 'socket.io-client';
import {initSockets} from './sockets/index';


class App extends Component {
    constructor(props) {
        super(props);
        //Khởi tạo state,
        this.socket = null;
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.login.type === "success") {
            if(localStorage.jwtToken){
                this.socket = io('http://localhost:3001',{
                    query: "token=" + localStorage.jwtToken
                });
                this.props.setupSocket(this.socket);
                initSockets(this.socket, this.props);
            }
        }
    }

    componentWillMount (){
        if(localStorage.jwtToken){
            setAuthToken(localStorage.jwtToken);
            const payload = jwt_decode(localStorage.jwtToken);
            this.props.loginSuccess(payload);

    
            const currentTime = Date.now() / 1000;
            if(payload.exp < currentTime) {
                this.props.logoutUser({});
                window.location.href = '/login-register'
            }
        }
    }
    render() {
        return (
        <div className="App">
            <BrowserRouter>
            <Route path='/' exact={true} render={() => {
                return (<Redirect to='/home' />);
            }} />
            <Route path='/home' component={Home} />
            <Route path='/login-register' component={Register} />
            <Route path='/login/:token' component={Register}/>
            </BrowserRouter>
        </div>
        );
    }
}

const mapStateToProps = (state) => {
  return {
      login: state.login
  }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        loginSuccess : (data) => {
            dispatch(actions.loginSuccess(data))
        },
        logoutUser : (data) => {
            dispatch(actions.logoutUser(data));
        },
        setupSocket : (data) =>{
            dispatch(actions.setupSocket(data));
        },
        addListContactsReceived : (data) => {
            dispatch(actions.addListContactsReceived(data));
        },
        removeListContactsReceived : (data) => {
            dispatch(actions.removeListContactsReceived(data));
        },
        addCountListContactsReceived : () => {
            dispatch(actions.addCountListContactsReceived());
        },
        removeCountListContactsReceived : () => {
            dispatch(actions.removeCountListContactsReceived());
        },
        removeListContactsSent : (data) => {
            dispatch(actions.removeListContactsSent(data));
        },
        removeCountListContactsSent : () => {
            dispatch(actions.removeCountListContactsSent());
        },
        addListContacts : (data) => {
            dispatch(actions.addListContacts(data));
        },
        addCountListContacts : () => {
        dispatch(actions.addCountListContacts());
        },
        removeListContacts : (data) => {
            dispatch(actions.removeListContacts(data))
        },
        removeCountListContacts : () => {
            dispatch(actions.removeCountListContacts())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
