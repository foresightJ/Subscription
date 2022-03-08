import React, { Component } from 'react';
import NavBar from '../Nav/navbar';



 export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
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

                      {/* Number */}
                      <div class="form-group row">
                        <label for="number" class="col-sm-3 col-form-label">Phone No.</label>
                        <div class="col-sm-9
                        ">
                          <input name="number"  class="form-control" id="inputNumber" value={this.state.number} onChange={this.onChange}/>
                        </div>
                      </div>

                      {/* Email */}
                      <div class="form-group row">
                        <label for="inputEmail3" class="col-sm-3 col-form-label">Email</label>
                        <div class="col-sm-9
                        ">
                          <input name="email" type="email" class="form-control" id="inputEmail3" value={this.state.email} onChange={this.onChange}/>
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


