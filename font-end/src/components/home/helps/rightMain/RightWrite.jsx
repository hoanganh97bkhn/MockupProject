import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Picker } from 'emoji-mart'

function mapStateToProps(state) {
    return {

    };
}

class RightWrite extends Component {
    render() {
        return (
            <div className="write">
                <div className="row">
                    <div className="col-2 action-chat">
                        <i className="fa fa-photo"></i>
                        <i className="fa fa-paperclip"></i>
                        <i className="fa fa-video-camera"></i>
                    </div>
                    <div className="col-9">
                        <div className="write-chat">
                            <input className="search-txt" name="" id=""/>
                            <i className="fa fa-smile-o"></i>
                        </div>
                    </div>
                    <div className="col-auto">
                        <i className="fa fa-paper-plane"></i>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
)(RightWrite);