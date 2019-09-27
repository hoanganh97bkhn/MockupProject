import React, { Component } from 'react';
import InfoContact from './InfoContact';
import avatar_default from './../../../../image/avatar-default.jpg';
import * as actions from './../../../../actions/index';
import {connect} from 'react-redux';
import axios from 'axios'
import config from './../../../../config/index';
import {Spin, Icon, Empty} from 'antd'

let urlImage = (avatar) => {
  if(avatar !== "avatar-default.jpg")
    return `${config.baseUrl}/images/${avatar}`
  else return avatar_default
}
const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />
class WaitConfirmation extends Component {
  constructor(props){
    super(props);
    this.state={
      skip : 0,
      displaySpiner : 'none',
      isEmpty : false
    }
  }

  componentDidMount = () => {
    this.setState({
      skip: this.props.contactsSent.length,
      isEmpty : this.props.contactsSent.length ? false : true
    })
  }

  componentWillReceiveProps = (nextProps) => {
    this.setState({
      skip : nextProps.contactsSent.length,
      isEmpty : this.props.contactsSent.length ? false : true
    })
  }

  handleScrollLoad = (event) =>{
    let element = event.target;
    if(element.scrollHeight - element.scrollTop === 476){
      this.setState({
        displaySpiner : 'block'
      });

      axios({
        url:`${config.baseUrl}/contacts-sent/readmore`,
        method: 'post',
        data: {
          skip: this.state.skip
        }
      })
      .then((res) => {
        this.props.scrollListContactsSent(res.data)
        this.setState({
          displaySpiner : 'none'
        })
      })
      .catch((error) => {
        console.log(error);
        this.setState({
          displaySpiner : 'none'
        })
      })
      
    }
  }

  handleCancelRequest = (item, index) => {
    //call api remove
    axios({
      url: `${config.baseUrl}/contact/remove-request-contact-sent`,
      method: "delete",
      data: {uid: item._id}
    })
    .then((res)=>{
      this.props.socket.emit("remove-request-contact-sent", {contactId : item._id});
      this.props.removeListContactsSent(item);
      this.props.removeCountListContactsSent();
      // this.props.removeFindUser(item);
    })
    .catch((error)=>{
      console.log(error)
    })
  }

  render() {
    let listData = this.props.contactsSent;
    return (
      <div>
        <div id="style-contatcs" className="find-user-bottom" onScroll={this.handleScrollLoad}>
          {this.state.isEmpty ? <div style={{textAlign : 'center', marginTop : '10px'}} ><Empty/></div> : null}
            <ul className="contactList">
              {listData.length > 0 ? 
                  listData.map((item, index)=>{
                    return (
                      <InfoContact 
                        key={index} 
                        avatar={urlImage(item.avatar)} 
                        nickname={item.nickname} 
                        address={item.address} 
                        titleSuccess={""} 
                        titleDanger={"Cancel Request"}
                        clickDanger={()=>this.handleCancelRequest(item, index)}>
                      </InfoContact> )
                  })  
              : null }
            </ul>
            <div style={{textAlign:'center', display: this.state.displaySpiner}}>
                <Spin indicator={antIcon}/>
            </div>
        </div>
      </div>
    );
  }
}


const mapStateToProps = (state) => {
  return {
    socket : state.socket,
    contactsSent : state.contactsSent,
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    addListContactsSent : (data) => {
      dispatch(actions.addListContactsSent(data));
    },
    scrollListContactsSent : (data) => {
      dispatch(actions.scrollListContactsSent(data));
    },
    removeListContactsSent : (data) => {
      dispatch(actions.removeListContactsSent(data))
    },
    removeCountListContactsSent : () => {
      dispatch(actions.removeCountListContactsSent())
    }
  }
}
  
  export default connect(mapStateToProps, mapDispatchToProps)(WaitConfirmation);