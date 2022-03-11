import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from "react-router-dom";
import services from '../../components/util/services';
import {Link } from 'react-router-dom';
import {Card} from 'react-bootstrap'

// import Delete from '../Delete/removeOne'


export default function SingleSub (props) {

    const history = useHistory();
    const subId = history.location.state
    const [data, setData] = useState()
    

    useEffect(()=>{
        //all Subscriptions
        (async()=>{
            try {
                const result = await services.findSubsById(subId)
                console.log("allSubs", result.data.sub)
                setData(result.data.sub)
            } catch (error) {
               console.log(error) 
            }
        })()

    },[subId])
    

    const dataStamp = (dt) => {
        const d = new Date( dt );
        // console.log(d.)
        const stamp =  `${d.getDay()}/${d.getMonth() + 1}/${d.getFullYear()}`;
        return stamp;

    }

    
    //DELETE A Subscription
    const deletedata = async(id) => {
       await services.removeSub(id)
       .then(result => {
        history.push('/')
        })
        .catch(err=> console.log(err))
    }
    return( 
        <>
                    {data && 
            <Card>
                <Card.Header>
                    <div style={{display: "flex", justifyContent: "space-between"}}>
                        <p>Company: {data.company}</p>
                        <p>Amount: ${data.cost}</p>
                    </div>
                </Card.Header>
                <Card.Body>
                    <>
                    <div style={{display: "flex", justifyContent: "space-between"}}>
                            <Card.Title>{data.name}</Card.Title>
                            <Card.Title> Recent Payment: {dataStamp(data.paymentDate)}</Card.Title>

                        </div>
                    <Card.Text>{data.description}</Card.Text>
                    <div style={{display: "flex", justifyContent: "space-between"}}>
                    <Link to={{
                        pathname: `/edit-subscription/${data._id}` ,
                        search: `?data=${data.name}`,
                        state: `${data._id}`,
                        }}
                        className="btn btn-warning ">
                            Edit My Info
                    </Link>
                    <button className="btn btn-danger" type="submit" onClick={() => deletedata(data._id)}>Delete My Account</button>
                    </div>
                    </>
                    
                    
                </Card.Body>
            </Card>
                    }
        </>
    
    )
    
}
