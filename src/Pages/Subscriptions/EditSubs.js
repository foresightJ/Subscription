import React, {useState, useEffect, } from 'react'
import { useHistory } from "react-router-dom";
import services from '../../components/util/services'


export default function EditSub (props) {
  const history = useHistory();
  const subId = history.location.state
  const loggedUser = props.loggedInUserId
  const [data, setData] = useState()
  const [user, setUser] = useState(null)
  const [name, setName] =useState('')
  const [cost, setCost] =useState('')
  const [company, setCompany] =useState('')
  const [description, setDescription] =useState('')
  const [paymentDate, setPaymentDate] =useState(Date.now())

  useEffect(() => {
   setUser(loggedUser)
    console.log(loggedUser)
    // loggedUser && loggedUser[0]
  }, [loggedUser])
  
  useEffect(()=>{
    //all Subscriptions
    (async()=>{
        try {
            const result = await services.findSubsById(subId)
            console.log("allSubs", result.data.sub)
            setData(result.data.sub)
            setName(result.data.sub.name)
            setCost(result.data.sub.cost)
            setCompany(result.data.sub.company)
            setDescription(result.data.sub.description)
            setPaymentDate(new Date(result.data.sub.paymentDate))
        } catch (error) {
           console.log(error) 
        }
    })()

},[subId])

  const onSubmit = async (e) => {
    try{
      e.preventDefault()
    const newSub = {
      name: name,
      cost: cost,
      company: company,
      description: description,
      paymentDate: paymentDate,
    }
    console.log(newSub)
    const res = await services.updateSubs(subId,newSub)
      console.log(res)
      history.push(`/`)
    }catch(e) {
      console.log(e);
    }
}

  return (
    <>
     {user && <> 
     
      <section className="guest">
            <div className="sign-up">
              <div className="card" style= {{width: "30rem"}} >
                <div className="card-header">
                  <h5 className="card-name"> Editing Mode</h5>
                  <hr></hr>
                </div>
                <div className="card-body">
                  <form noValidate onSubmit={onSubmit}>
                    <div className="form">
                      
                      {/* Name */}
                      <div className="form-group row">
                        <label  className="col-sm-3 col-form-label">Name</label>
                        <div className="col-sm-9
                        ">
                          <input name="name" type="text" className="form-control" id="inputname" value={name} onChange={(e) => setName(e.target.value)}/>
                        </div>
                      </div>

                      {/* Company */}
                      <div className="form-group row">
                        <label  className="col-sm-3 col-form-label">Company</label>
                        <div className="col-sm-9
                        ">
                          <input name="company" type="text" className="form-control" id="inputcompany" value={company} onChange={(e) => setCompany(e.target.value)}/>
                        </div>
                      </div>


                      {/* Description */}
                      <div className="form-group row">
                        <label  className="col-sm-3 col-form-label">Description</label>
                        <div className="col-sm-9
                        ">
                          <textarea class="form-control" name="description" id="exampleFormControlTextarea1" rows="2" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
                        </div>
                      </div>

                      {/* Payment Date*/}
                      <div className="form-group row">
                        <label  className="col-sm-3 col-form-label">Payment Date</label>
                        <div className="col-sm-9
                        ">
                          <input name="nextPayment" type="Date" className="form-control" id="inputEmail3" value={paymentDate} onChange={(e) => setPaymentDate(e.target.value)}/>
                        </div>
                      </div>


                      {/* Amount/cost */}

                      <div className="form-group row">
                        <label  className="col-sm-3 col-form-label">Cost</label>
                        <div className="col-sm-9
                        ">
                          <div class="input-group">
                            <input type="number" class="form-control" value={cost} name="cost" min='0.00' step="0.01" aria-label="Dollar amount (with dot and two decimal places)" onChange={(e) => setCost(e.target.value)}/>
                            <span class="input-group-text">$</span>
                          </div>
                        </div>
                      </div>
                      
                    </div>

                    <div className="getSubmit">  
                      <button type="submit" className="btn">Update Subscription</button>
                    </div>
                  </form>

                </div>
                
              </div>
            </div>
            </section>
     </> }
     {!user && <> 
      
      <p>Please Login In</p>
     </> }
    </>
  )
}