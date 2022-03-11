import React, { Component } from 'react';
import jwt_decode from "jwt-decode";
import services from '../../components/util/services'



 export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: '',
      email: '',
      error: ''
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({[e.target.name]: e.target.value, error: ''})
  }

  onSubmit(e) {
    e.preventDefault();
    const newUser = {
      email: this.state.email,
      password: this.state.password,
      }
      services.postLogin(newUser)
      .then(res => {
        let token = res.data
        localStorage.setItem('token', token);  
        const userDoc = jwt_decode(token); 
        window.location.reload();
     })
    .catch(e => {
      console.log(e);
    });
  }

   render() { 
     return (
        <React.Fragment>
            <section className="guest">
            <div className="sign-up">
              <div className="card" style= {{width: "30rem"}} >
                <div className="card-header">
                  <h5 className="card-title"> Login To Your Account</h5>
                  <hr></hr>
                </div>
                <div className="card-body">
                  <form noValidate onSubmit={this.onSubmit}>
                    <div className="form">


                      {/* Email */}
                      <div className="form-group row">
                        <label htmlFor="inputEmail3" className="col-sm-3 col-form-label">Email</label>
                        <div className="col-sm-9
                        ">
                          <input name="email" type="email" className="form-control" id="inputEmail3" value={this.state.email} onChange={this.onChange}/>
                        </div>
                      </div>

                      {/* password */}
                      <div className="form-group row">
                        <label htmlFor="password" className="col-sm-3 col-form-label">Password</label>
                        <div className="col-sm-9
                        ">
                          <input name="password"  type="password" className="form-control" id="inputpassword" value={this.state.password} onChange={this.onChange}/>
                        </div>
                      </div>
                      
                    </div>

                    <div className="getSubmit">  
                      <button type="submit" className="btn">Login</button>
                    </div>
                  </form>
                  <div className="faster-easier-sign-up">
                    <p>Don't have an account?</p>
                      <p><a href='/create-an-account'>Create</a> an account for faster and easier access</p>
                      <div className="social-icon d-flex container">
                      <a href="#" className="img"><i className="fa fa-google"></i></a>
                      <a href="#" className="img"><i className="fa fa-facebook"></i></a>
                      </div>
                  </div>

                </div>
                
              </div>
            </div>
            </section>
        </React.Fragment>
    )}
}


