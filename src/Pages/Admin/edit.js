import React, { useState, useEffect } from 'react';
import { withRouter } from "react-router-dom";

import services from '../../components/util/services'
import NavBar from '../../components/Nav/navbar';




 export default function Edit (props) {
  
  const userId = props.location.state
    const [user, setUser]  = useState({})
    const [firstName, setFirstName]  = useState('')
    const [lastName, setLastName]  = useState('')
    const [email, setEmail]  = useState('')


    useEffect( () => {
      (async()=>{
        try{
  
          const user = await services.findById(userId);
          console.log(user)
          setUser(user.data.data)
          setFirstName(user.data.data.firstName)
        setLastName(user.data.data.lastName)
        setEmail(user.data.data.email)
  
        }catch(err){console.log(err)}
      })()

    },[userId])

    
 const onUpdate = (e) => {
    e.preventDefault();

    //GET CURRENT VALUES
    const updatedUser = {
      id: userId,
      firstName: firstName,
      lastName: lastName,
      email: email,
    }
    services.postEdit(userId, updatedUser)
    .then(res=> {
      //REDIRECT TO THE /findbyid/${el.id} PAGE
      props.history.goBack()
    })
    .catch(err => console.log(err))
  }


 

    return (
      <React.Fragment>
        
        <section className="guest">
          <div className="sign-up">
            {userId && 
              <div className="card" style= {{width: "30rem"}} >
                <div className="card-header">
                  <h5 className="card-firstName">Update My Info</h5>
                  <hr></hr>
                </div>
                <div className="card-body">
                  <form noValidate onSubmit={onUpdate}>
                    <div className="form">
                      
                      {/* First Name */}
                      <div className="form-group row">
                        <label  className="col-sm-3 col-form-label">First Name</label>
                        <div className="col-sm-9
                        ">
                          <input name="firstName" type="text" className="form-control" id="inputFirstName" value={firstName} onChange={(e)=>setFirstName(e.target.value)}/>
                        </div>
                      </div>

                      {/* Last Name */}
                      <div className="form-group row">
                        <label  className="col-sm-3 col-form-label">Last Name</label>
                        <div className="col-sm-9
                        ">
                          <input name="lastName" type="text" className="form-control" id="inputlastName" value={lastName} onChange={(e)=>setLastName(e.target.value)}/>
                        </div>
                      </div>


                      

                      {/* Email */}
                      <div className="form-group row">
                        <label  className="col-sm-3 col-form-label">Email</label>
                        <div className="col-sm-9
                        ">
                          <input name="email" type="email" className="form-control" id="inputEmail3" value={email} onChange={(e)=>setEmail(e.target.value)}/>
                        </div>
                      </div>
                      
                    </div>

                    <div className="getSubmit">  
                      <button type="submit" className="btn">Update</button>
                    </div>
                  </form>

                </div>
                
              </div>
            }
          </div>
          </section>
      </React.Fragment>
  )

}





