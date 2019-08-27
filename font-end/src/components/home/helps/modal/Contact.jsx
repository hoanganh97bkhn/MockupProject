import React, { Component } from 'react';
import InfoContact from './InfoContact';
import avatar_default from './../../../../image/avatar-default.jpg';
import config from './../../../../config/index';

let urlImage = (avatar) => {
  if(avatar !== "avatar-default.jpg")
    return `${config.baseUrl}/images/${avatar}`
  else return avatar_default
}
class Contact extends Component {
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
                        titleSuccess={"Messgae"} 
                        titleDanger={"Delete"}>
                      </InfoContact> )
                  })  
              : null }
            </ul>
        </div>
      </div>
    );
  }
}

export default Contact;
