import React, { Component } from 'react';
import { connect } from 'react-redux';
import avatar from './../../../../image/avatar-default.jpg';

class ContentChat extends Component {
    render() {
        console.log(this.props.user)
        let dataMessage = this.props.data;
        return (
            <div className="content-chat">
                <div id="style-chat" className="chat" data-chat="" tabIndex="2">
                    {/* {!dataMessage ? null : dataMessage.messages.map((item, index) => {
                        if(item.messageType === "text"){

                        }
                        else if(item.messageType === "image"){

                        }
                        else if(item.messageType === "file"){

                        }
                    })} */}
                    <div className="bubble me" data-mess-id="${item._id}">Hello, I'm Hoang Anh, author of https://hoanganh.com</div>
                    <div className="bubble you" data-mess-id="${item._id}">Really? I'm Hoang Anh too, author of https://hoanganh.com, are you fake?</div>
                    <div className="bubble me" data-mess-id="${item._id}">This is me !!!</div>
                    <div className="bubble me bubble-image-file" data-mess-id="${item._id}">
                        <img src={avatar} className="show-image-chat"></img>
                    </div>
                    <div className="bubble me bubble-image-file" data-mess-id="${item._id}">
                        <a href={avatar} download="${ item.file.fileName }">
                            Tệp văn bản - hoanganh.pdf
                        </a>
                    </div>
                    <div className="bubble you" data-mess-id="${item._id}">And this is me @@ !!!</div>
                    <div className="bubble you bubble-image-file" data-mess-id="${item._id}">
                        <img src={avatar} className="show-image-chat"></img>
                    </div>
                    <div className="bubble you bubble-image-file" data-mess-id="${item._id}">
                        <a href="../../libraries/fileExample/Tệp văn bản - hoanganh.docx" download="${ item.file.fileName }">
                            Tệp văn bản - hoanganh.docx
                        </a>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        user : state.user
    };
}

export default connect(
    mapStateToProps,
)(ContentChat);