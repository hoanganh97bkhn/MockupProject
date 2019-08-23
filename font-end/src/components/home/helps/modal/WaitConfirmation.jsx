import React, { Component } from 'react';
import InfoContact from './InfoContact';
import avatar_default from './../../../../image/avatar-default.jpg';
import * as actions from './../../../../actions/index';
import {connect} from 'react-redux';
import axios from 'axios';
import config from './../../../../config/index';

class Contact extends Component {
  constructor(props){
    super(props);
    this.state={
      listAddContact : []
    }
  }
  componentWillMount = () => {
    axios({
      url: `${config.baseUrl}/contact/list/addfriend`,
      method: 'GET',
    })
    .then((response) => {
      console.log(response.data)
      this.setState({
        listAddContact : response.data
      })
    })
    .catch((error)=> {
      console.log(error)
    })
  }

  render() {
    return (
      <div>
        <div className="find-user-bottom">
            <ul className="contactList">
                <InfoContact avatar={avatar_default} titleSuccess={""} titleDanger={"Cancel Request"}></InfoContact>
            </ul>
        </div>
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
    return {
          logoutUser : (data) => {
            dispatch(actions.logoutUser(data));
          }
    }
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(Contact);