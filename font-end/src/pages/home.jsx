import React, { Component } from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom'

class home extends Component {
    componentDidMount(){
            if(!this.props.auth.isAuthenticated) {
            this.props.history.push('/login-register');
        }
    }
    
    render() {
        return (
        <div>
            <div>Hello home</div>
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