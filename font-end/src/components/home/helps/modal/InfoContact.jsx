import React, { Component } from 'react';

class InfoContact extends Component {
    constructor(props){
        super(props);

    }
    render() {
        return (
            <li className="_contactList">
                <div className="contactPanel">
                    <div className="user-avatar">
                        <img src={this.props.avatar}></img>
                    </div>
                    <div className="user-name">
                        <p>{this.props.nickname}</p>
                    </div>
                    <br></br>
                    <div className="user-address">
                        <span>&nbsp;{this.props.address}</span>
                    </div>
                    {this.props.titleSuccess != "" ? <div className="user-add-new-contact" onClick={this.props.clickSuccess}>
                            {this.props.titleSuccess}
                        </div> : null 
                    }
                    {this.props.titleDanger != ""? <div className="user-remove-contact action-danger" onClick={this.props.clickDanger}>
                            {this.props.titleDanger}
                        </div> : null 
                    }
                </div>
            </li>
        );
    }
}

export default InfoContact;
