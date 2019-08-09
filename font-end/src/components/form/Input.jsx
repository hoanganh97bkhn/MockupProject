import React, { Component } from 'react';

class Input extends Component {
    constructor(props){
        super(props);
        this.state = {
            value : "",
            onfocus: ""
        }
    }
    
    handleUserInput = (e) => {
        this.props.onChangeData(e.target.name, e.target.value);
        this.setState({
            value: e.target.value,
        })
    }

    addClass = () => {
        this.setState({
            onfocus: "focus"
        })
    }

    removeClass = () => {
        if(this.state.value === ""){
            this.setState({
                onfocus: ""
            })
        }
    }
    
    render() {
        return (
        <div className="txtb">
            <input className={this.state.onfocus} onFocus={this.addClass} onBlur={this.removeClass} type={this.props.type} onChange={this.handleUserInput} name={this.props.name}></input>
            <span data-placeholder={this.props.dataPlaceholder}></span>
        </div>
        );
  }
}

export default Input;