import React, { Component } from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom'
import {Row, Col} from 'antd';
import NavBar from './../components/home/NavBar';
import LeftMain from './../components/home/LeftMain';
import RightMain from './../components/home/RightMain';
import axios from 'axios';
import config from './../config/index';
import * as actions from './../actions/index';

class home extends Component {


    componentWillMount = ()=>{
        axios({
            url:`${config.baseUrl}/message/conversation/list`,
            method : 'GET',
        })
        .then((res) => {
            this.props.getListUserConversations(res.data.userConversations);
            this.props.getListGroupConversations(res.data.groupConversations);
            this.props.getListAllConversations(res.data.allConversations);
        })
        .catch((error) => {
            console.log(error)
        })
    }

    componentDidMount(){
        if(!this.props.auth.isAuthenticated) {
            this.props.history.push('/login-register');
        }
    }
    
    render() {
        return (
        <div className="home">
            {/* Icon loader */}
            <div id="loader"></div>

            {/* NavBar */}
            <NavBar></NavBar>
            <Row guiter={16} className="row-content">
                <Col className="left-main" span={6}>
                    <LeftMain></LeftMain>
                </Col>
                <Col className="right-main" span={18}>
                    <RightMain></RightMain>
                </Col>
            </Row>
        </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.login,

    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        getListUserConversations : (data) => {
          dispatch(actions.getListUserConversations(data))
        },
        getListGroupConversations : (data) => {
            dispatch(actions.getListGroupConversations(data))
        },
        getListAllConversations : (data) => {
            dispatch(actions.getListAllConversations(data))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter (home))
