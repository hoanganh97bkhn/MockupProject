import React, { Component } from 'react';
import '../node_modules/font-awesome/css/font-awesome.min.css'; 
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import {connect} from 'react-redux';
import axios from 'axios';
import config from './config/index';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';
import './App.css';
import Home from './pages/home';
import Register from './pages/register';

class App extends Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Route path='/' exact={true} render={() => {
            return (<Redirect to='/home' />);
          }} />
          <Route path='/home' component={Home} />
          <Route path='/login-register' component={Register} />
          <Route path='/login/:token' component={Register}/>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;