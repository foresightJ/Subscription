import React, { Component } from 'react';
import jwt_decode from "jwt-decode";
import services from '../../../components/util/services'
import NavBar from '../../../components/Nav/navbar';



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
        this.props.setUserInState(userDoc.user)
        this.props.history.push(`/`)
     })
     .then(resp => {
       //REDIRECT TO THE /findbyid/${el.id} PAGE
      // this.props.history.goBack()
      this.props.history.push('/')
     } )
    .catch(e => {
      console.log(e);
    });
  }

   render() { 
     return (
        <React.Fragment>
          <NavBar/>
            <section className="guest">
            <div className="sign-up">
              <div class="card" style= {{width: "30rem"}} >
                <div class="card-header">
                  <h5 class="card-title"> I WANT a cook</h5>
                  <hr></hr>
                </div>
                <div class="card-body">
                  <form noValidate onSubmit={this.onSubmit}>
                    <div className="form">


                      {/* Email */}
                      <div class="form-group row">
                        <label for="inputEmail3" class="col-sm-3 col-form-label">Email</label>
                        <div class="col-sm-9
                        ">
                          <input name="email" type="email" class="form-control" id="inputEmail3" value={this.state.email} onChange={this.onChange}/>
                        </div>
                      </div>

                      {/* password */}
                      <div class="form-group row">
                        <label for="password" class="col-sm-3 col-form-label">Password</label>
                        <div class="col-sm-9
                        ">
                          <input name="password"  type="password" class="form-control" id="inputpassword" value={this.state.password} onChange={this.onChange}/>
                        </div>
                      </div>
                      
                    </div>

                    <div className="getCook">  
                      <button type="submit" class="btn">Login</button>
                    </div>
                  </form>
                  <div className="faster-easier-sign-up">
                      <p> Create an account for faster and easier</p>
                      <div className="social-icon d-flex container">
                      <a href="#" class="img"><i class="fa fa-google"></i></a>
                      <a href="#" class="img"><i class="fa fa-facebook"></i></a>
                      </div>
                  </div>

                </div>
                
              </div>
            </div>
            </section>
        </React.Fragment>
    )}
}


