import {connect} from 'react-redux';
import * as actions from './../../actions/index';

let removeNewContact = (socket) => {
  socket.on('response-remove-new-contact', (response) => { this.props.ResRemoveNewContact(response)}); //lắng nghe khi có tin nhắn mới
}

// const mapStateToProps = (state) => {
//   return {
//       login: state.login
//   }
// }

const mapDispatchToProps = (dispatch, props) => {
  return {
    ResRemoveNewContact: (data) =>{
      dispatch(actions.ResRemoveNewContact(data))
    }
  }
}
export default connect(null, mapDispatchToProps)(removeNewContact);
