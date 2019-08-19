import React, { Component } from 'react';
import {Row,Col,Icon,Input,Tooltip} from 'antd';
import { Picker } from 'emoji-mart'
import avatar from './../../image/avatar-default.jpg';

class RightMain extends Component {
    constructor(props){
        super(props);
        this.state={
            text : "",
            showEmojis: false,
            errors: []
        }
    }

    handleChange = (e) => {
        this.setState({ text: e.target.value })
    }
    showEmojis = e => {
        this.setState(
          {
            showEmojis: true
          },
          () => document.addEventListener("click", this.closeMenu)
        );
    };
    closeMenu = e => {
        console.log(this.emojiPicker);
        if (this.emojiPicker !== null && !this.emojiPicker.contains(e.target)) {
          this.setState(
            {
              showEmojis: false
            },
            () => document.removeEventListener("click", this.closeMenu)
          );
        }
    };
    handleChange = e => {
        //let validation = validate(e.target.value);
        //console.log(validation)
        this.setState({
          text: e.target.value,
          //errors: validation
        });
      };
      addEmoji = e => {
        // console.log(e.native);
        let emoji = e.native;
        this.setState({
          text: this.state.text + emoji
        });
      };

    render() {
        return (
        <div className="right">
            <div className="top">
                <Row>
                    <Col span={8}>
                        To: <span><strong>nickname</strong></span>
                    </Col>
                    <Col span={3} offset={10}>
                    <div>
                        Image
                        <Icon type="file-image" />
                        </div>
                    </Col>
                    <Col span={3}>
                    <div>
                        File
                        <Icon type="paper-clip" />
                        </div>
                    </Col>
                </Row>
            </div>
            <div className="content-chat">
                <div id="style-chat" className="chat" data-chat="" tabIndex="2">
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
                
        </div>
        );
    }
}

export default RightMain;