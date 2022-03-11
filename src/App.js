import React,{Component} from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import 'font-awesome/css/font-awesome.min.css';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import jwt_decode from "jwt-decode";
import Home from './components/Home/home';
import Signup from './components/signup/signup';
import Login from './components/LogIn/login';
import FindById from './components/findbyId/findbyId';
import Edit from './components/Update/edit'


class App extends Component {
  state = {
    user:null,
  }
  
  setUserInState = (incomingUserData) => {
    this.setState({ user: incomingUserData})
  }
  // when the page refreshes, check localStorage for the user jwt token
  componentDidMount() {
    let token = localStorage.getItem('token')
    if (token) {
      // YOU DO: check expiry!
      const userDoc = jwt_decode(token);  // decode jwt token
      this.setState({user: userDoc.user})      
    }
  }
  

render() {
  return (
    <React.Fragment>
      <Router>
        <Switch>
          <Route path="/"  exact component={Home} />  
          <Route path="/signin" render={(props) => (
            <Signup {...props} setUserInState={this.setUserInState}/>
          )}/>
        <Route path="/login" render={(props) => (
            <Login {...props} setUserInState={this.setUserInState}/>
          )}/> 
          <Route path="/findbyid/" component={FindById} />       
          <Route path="/edit/" component={Edit} />       
        </Switch>
      </Router>
    </React.Fragment>
    
  );}
}
export default App;
