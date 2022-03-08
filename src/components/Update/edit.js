import React, { Component } from 'react';
import { withRouter } from "react-router-dom";


import services from '../util/services'
import NavBar from '../Nav/navbar';




 export default class createAnAccount extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userData: [],
            id: '',
            firstName: '',
            lastName: '',
            address: '',
            number: '',
            email: '',
    };

    this.onChange = this.onChange.bind(this);
    this.onUpdate = this.onUpdate.bind(this);
  }
  
  componentDidMount() {
    // RETRIEVE THE USER
    const id = this.props.location.state
    // console.log(id)
    services.findOne(id)
    .then(user => {
      this.setState({
        userData: user.data.data,
        id : user.data.data._id,
        firstName: user.data.data.FirstName,
        lastName: user.data.data.LastName,
        address: user.data.data.Address,
        number: user.data.data.Number,
        email: user.data.data.Email,
      })
    })
    .catch(err => console.log(err));
  }
    
  onChange(e) {
    // console.log([e.target.name], e.target.value)
    this.setState({[e.target.name]: e.target.value});
  }
    
  onUpdate(e) {
    e.preventDefault();
    const id = this.state.id;

    //GET CURRENT VALUES
    const updatedUser = {
      id: this.state.id,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      address: this.state.address,
      number: this.state.number,
      email: this.state.email,
    }
    services.postEdit(id, updatedUser)
    .then(res=> {
      //REDIRECT TO THE /findbyid/${el.id} PAGE
      this.props.history.goBack()
    })
    .catch(err => console.log(err))
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
                <form noValidate onSubmit={this.onUpdate}>
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
                    <button type="submit" className="btn">Update</button>
                  </div>
                </form>

              </div>
              
            </div>
          </div>
          </section>
      </React.Fragment>
  )}
}





