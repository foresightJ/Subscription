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
import Home from './Pages/Home/home';
import Signup from './Pages/Auth/signup';
import Login from './Pages/Auth/login';
import MyAccount from './Pages/Admin/MyAccount';
// import Edit from './Pages/Admin/edit'
import Edit from './Pages/Admin/edit'
import NavBar from './components/Nav/navbar';

import AddSubscription from './Pages/Subscriptions/AddSub'


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
      console.log(jwt_decode(token))
      const userDoc = jwt_decode(token);  // decode jwt token
      console.log(userDoc)
      this.setState({user: userDoc.user})      
    }
  }
  render() {
  return (
    <React.Fragment>
         {this.state.user && <NavBar loggedInUserId={this.state.user} setUserInState={this.setUserInState}/>}
      <Router>
    
        {this.state.user ? 
          <Switch>
            <Route path="/" exact render={(props) => (
              <Home {...props} loggedInUserId={this.state.user} />
            )}/>
            <Route path="/my-account" exact render={(props) => (
              <MyAccount {...props} loggedInUserId={this.state.user} setUserInState={this.setUserInState}/>
            )}/>
            {/* <Route path="/edit" exact render={(props) => (
              <Edit {...props} loggedInUserId={this.state.user[0]} />
            )}/> */}
            {/* <Route path="/my-account" component={FindById} />        */}
            <Route path="/edit/" component={Edit} loggedInUserId={this.state.user[0]} /> 

            <Route path="/addSubscription" render={(props) => (
              <AddSubscription {...props} loggedInUserId={this.state.user}/>
            )}/>

          </Switch>
        :
          <Switch>
            <Route path="/create-an-account" render={(props) => (
              <Signup {...props} setUserInState={this.setUserInState}/>
            )}/>

            <Route path="/" exact render={(props) => (
                <Home {...props} loggedInUserId={this.state.user} />
            )}/>
          </Switch>
}
        
      </Router>
    </React.Fragment>
    
  );}
}
export default App;
