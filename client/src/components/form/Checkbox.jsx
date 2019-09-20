import React, { Component } from 'react';

class Checkbox extends Component {
    constructor(props){
        super(props)
    }

    handleChangeRadio =(e) => {
        this.props.changeGender(e.target.value)
    }
    render() {
        return (
            <div className="form-check-inline mr-3">
                <label className="form-check-label">
                    <input type="radio" className="form-check-input" value={this.props.name} onChange={this.handleChangeRadio} checked={this.props.check === this.props.name}></input>{this.props.title}
                </label>
            </div>
        );
    }
}

export default Checkbox;