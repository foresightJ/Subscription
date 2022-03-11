import React, { useState, useEffect } from 'react';
import {Link } from 'react-router-dom';
import services from '../../components/util/services'
import {Card, Col, Row} from 'react-bootstrap'

export default  function AllSubs () {
    const {data, setData} = useState([])
  

 
    useEffect(()=>{
        //all Subscriptions
        (async()=>{
            try {
                const result = await services.findAllSubs()
                console.log("allSubs", result)
                setData(result.data)
            } catch (error) {
               console.log(error) 
            }
        })()

    })
    



    


    return (
        <div>
            <div className="card-group">
            <Row xs={1} md={2} className="g-4">
            {Array.from({ length: 4 }).map((el, idx) => (
                <Col key={idx}>
                <Card>
                    <Card.Img variant="top" src="holder.js/100px160" />
                    <Card.Body>
                        <div style={{display: "flex", justifyContent: "space-between"}}>
                            <Card.Title>Subscription Name</Card.Title>
                            <Card.Title>$$</Card.Title>

                        </div>
                    <Card.Text>
                        This is a longer card with supporting text below as a natural
                        lead-in to additional content. This content is a little bit longer.
                    </Card.Text>
                    <Link to={{
                        // pathname: `/findSubsById/${el._id}` ,
                        // search: `?sort=${el.FirstName}${el.LastName}`,
                        // hash: "#the-hash",
                        // state: el._id,
                        
                        }}
                        className="btn badge badge-warning">
                            Subscription Details
                    </Link>
                    </Card.Body>
                </Card>
                </Col>
            ))}
            </Row>
            </div>
        </div>
    )
    
}
