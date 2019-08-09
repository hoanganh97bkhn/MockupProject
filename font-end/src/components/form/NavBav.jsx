import React, { Component } from 'react';
import brand from './../../image/brand.png'

class NavBav extends Component {
  render() {
    return (
      <div className="navbar">
        <nav className="navbar navbar-expand-lg navbar-light">
            <a className="navbar-brand" href="#"><img src={brand}></img></a>
        </nav>
        <div className="row">
            <div className="col">
                <button className="btn btn-success mx-2 my-2 my-sm-0" type="submit" onClick={this.props.openLogin}>Login</button>
                <button className="btn btn-outline-success my-2 my-sm-0" type="submit" onClick={this.props.openRegister}>Register</button>
            </div> 
        </div>
    </div>
    );
  }
}

export default NavBav;