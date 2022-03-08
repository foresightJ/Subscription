import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import 'font-awesome/css/font-awesome.min.css';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Home from './components/Home/home';
import Signup from './components/signup/signup';
import Login from './components/LogIn/login';
import FindById from './components/findbyId/findbyId';
import Edit from './components/Update/edit'


function App() {
  return (
    <React.Fragment>
      <Router>
        <Switch>
          <Route path="/"  exact component={Home} />
          <Route path="/signin" component={Signup} />
          <Route path="/login" component={Login} />       
          <Route path="/findbyid/" component={FindById} />       
          <Route path="/edit/" component={Edit} />       
        </Switch>
      </Router>
    </React.Fragment>
    
  );
}
export default App;
