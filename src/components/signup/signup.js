import React, { Component } from 'react';
import services from '../util/services'
import jwt_decode from "jwt-decode";
import NavBar from '../Nav/navbar';
import './signup.css';




 export default class createAnAccount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      password: '',
      number: '',
      email: '',
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({[e.target.name]: e.target.value})
  }

 
    
  onSubmit(e) {
    e.preventDefault();
    const newUser = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      password: this.state.password,
      email: this.state.email,
      }
    services.create(newUser)
    .then(res => {
      console.log(res)
        let token = res.data
        localStorage.setItem('token', token);  
        const userDoc = jwt_decode(token); 
        console.log(userDoc.user)
        this.props.setUserInState(userDoc.user)
        this.props.history.push(`/`)

    })
    .catch(e => {
      console.log(e);
    });
    }

    newUser() {
      this.setState({
          id: null,
          firstName: '',
          lastName: '',
          email: '',
          password: '',
        
      });
    }

   render() { 
     return (
        <React.Fragment>
          <NavBar/>
          <section className="guest">
            <div className="sign-up">
              <div className="card" style= {{width: "30rem"}} >
                <div className="card-header">
                  <h5 className="card-firstName"> SIGN UP</h5>
                  <hr></hr>
                </div>
                <div className="card-body">
                  <form noValidate onSubmit={this.onSubmit}>
                    <div className="form">
                      
                      {/* First Name */}
                      <div className="form-group row">
                        <label  className="col-sm-3 col-form-label">First Name</label>
                        <div className="col-sm-9
                        ">
                          <input name="firstName" type="text" className="form-control" id="inputFirstName" value={this.state.firstName} onChange={this.onChange}/>
                        </div>
                      </div>

                      {/* Last Name */}
                      <div className="form-group row">
                        <label  className="col-sm-3 col-form-label">Last Name</label>
                        <div className="col-sm-9
                        ">
                          <input name="lastName" type="text" className="form-control" id="inputlastName" value={this.state.lastName} onChange={this.onChange}/>
                        </div>
                      </div>

                      {/* Email */}
                      <div className="form-group row">
                        <label  className="col-sm-3 col-form-label">Email</label>
                        <div className="col-sm-9
                        ">
                          <input name="email" type="email" className="form-control" id="inputEmail3" value={this.state.email} onChange={this.onChange}/>
                        </div>
                      </div>
                      

                      {/* Password */}
                      <div className="form-group row">
                        <label  className="col-sm-3 col-form-label">Password.</label>
                        <div className="col-sm-9
                        ">
                          <input name="password" type="password" className="form-control" id="inputPassword" value={this.state.password} onChange={this.onChange}/>
                        </div>
                      </div>

                      
                    </div>

                    <div className="getSubmit">  
                      <button type="submit" className="btn">Sing Me up</button>
                    </div>
                  </form>

                </div>
                
              </div>
            </div>
            </section>
        </React.Fragment>
    )}
}
