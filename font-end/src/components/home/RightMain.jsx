import React, { Component } from 'react';
import RightWrite from './helps/rightMain/RightWrite';
import ContentChat from './helps/rightMain/ContentChat';
import RightTop from './helps/rightMain/RightTop';

class RightMain extends Component {
    constructor(props){
        super(props);
        this.state={
            item_room_chat : {}
        }
    }

    componentWillReceiveProps = (nextProps) => {
        this.setState({
            item_room_chat : nextProps.handleOpenChat
        })
    }


    render() {
        return (
            <div className="right">
                <RightTop data={this.state.item_room_chat}/>
                <ContentChat data = {this.state.item_room_chat}/>
                <RightWrite/>
            </div>
        );
    }
}

export default RightMain;