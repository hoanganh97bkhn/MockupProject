import {connect} from 'react-redux';
import * as actions from './../../actions/index';

let addNewContact = (socket) => {
  socket.on('response-add-new-contact', (response) => { this.props.ResAddNewContact(response)}); //lắng nghe khi có tin nhắn mới
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    ResAddNewContact: (data) =>{
      dispatch(actions.ResAddNewContact(data))
    }
  }
}
export default connect(null, mapDispatchToProps)(addNewContact);
