import React, { Component } from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom'
import {Row, Col} from 'antd';
import NavBar from './../components/home/NavBar';
import LeftMain from './../components/home/LeftMain';
import RightMain from './../components/home/RightMain';

class home extends Component {
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
        auth: state.login
    }
}

const mapDispatchToProps = (dispatch, props) => {
  // return {
  //     register : (data) => {
  //         dispatch(actions.register(data))
  //     },
  //     login : (data) => {
  //         dispatch(actions.login(data))
  //     }
  // }
}

export default connect(mapStateToProps, null)(withRouter (home));