import React, { Component } from 'react';
import InfoContact from './InfoContact';
import avatar_default from './../../../../image/avatar-default.jpg';
import * as actions from './../../../../actions/index';
import {connect} from 'react-redux';
import config from './../../../../config/index';

let urlImage = (avatar) => {
  if(avatar !== "avatar-default.jpg")
    return `${config.baseUrl}/images/${avatar}`
  else return avatar_default
}
class Contact extends Component {
  constructor(props){
    super(props);
    this.state={
      listAddContact : []
    }
  }

  render() {
    return (
      <div>
        <div className="find-user-bottom">
            <ul className="contactList">
              {this.props.listData.length > 0 ? 
                  this.props.listData.map((item, index)=>{
                    return (
                      <InfoContact 
                        key={index} 
                        avatar={urlImage(item.avatar)} 
                        titleSuccess={item.titleSuccess} 
                        titleDanger={item.titleDanger} 
                        nickname={item.nickname} 
                        address={item.address} 
                        titleSuccess={""} 
                        titleDanger={"Cancel Request"}>
                      </InfoContact> )
                  })  
              : null }
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