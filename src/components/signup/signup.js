import React, { Component } from 'react';
import services from '../util/services'
import NavBar from '../Nav/navbar';
import './signup.css';




 export default class createAnAccount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      address: '',
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
      address: this.state.address,
      number: this.state.number,
      email: this.state.email,
      }
    services.create(newUser)
    .then(res => {
      console.log(res)
      this.props.history.push(`/`)
       // this.setState({
      //   // id: response.newUser.id,
      //   firstName: response.newUser.firstName,
      //   lastName: response.newUser.lastName,
      //   address: response.newUser.address,
      //   number: response.newUser.number,
      //   email: response.newUser.email,
      // });
      // console.log(response.newUser);

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
          address: '',
          number: '',
          email: '',
        
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
                  <h5 className="card-firstName"> I WANT a cook</h5>
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

                      {/* Address */}
                      <div className="form-group row">
                        <label  className="col-sm-3 col-form-label">Address</label>
                        <div className="col-sm-9
                        ">
                        <textarea name="address" className="form-control" id="inputAddress" rows="3" value={this.state.address} onChange={this.onChange}></textarea>
                        </div>
                      </div>

                      {/* Number */}
                      <div className="form-group row">
                        <label  className="col-sm-3 col-form-label">Phone No.</label>
                        <div className="col-sm-9
                        ">
                          <input name="number" className="form-control" id="inputNumber" value={this.state.number} onChange={this.onChange}/>
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
                      
                    </div>

                    <div className="getCook">  
                      <button type="submit" className="btn">Let's get my Cook</button>
                    </div>
                  </form>

                </div>
                
              </div>
            </div>
            </section>
        </React.Fragment>
    )}
}





