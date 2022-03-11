import React, { useState, useEffect } from 'react';
import {Link } from 'react-router-dom';
import services from '../../components/util/services'
import {Card, Col, Row} from 'react-bootstrap'

export default  function AllSubs (props) {
    const [data, setData] = useState([])
    const loggedUser = props.loggedInUserId


 
    useEffect(()=>{
        //all Subscriptions
        (async()=>{
            try {
                const result = await services.findAllSubs("622b405b50632fc7865e2f05")
                console.log("allSubs", result.data.subs)
                setData(result.data.subs)
            } catch (error) {
               console.log(error) 
            }
        })()

    },[])
    

    return (
        <div>
            <div className="card-group">
            <Row xs={1} md={2} className="g-4">
            {data.map((el, idx) => (
                <Col key={idx}>
                <Card>
                    <Card.Img variant="top" src="holder.js/100px160" />
                    <Card.Body>
                        <div style={{display: "flex", justifyContent: "space-between"}}>
                            <Card.Title>{el.name}</Card.Title>
                            <Card.Title>${el.cost}</Card.Title>

                        </div>
                    <Card.Text>
                        {el.description}
                        This is a longer card with supporting text below as a natural
                        lead-in to additional content. This content is a little bit longer.
                    </Card.Text>
                    <Link to={{
                        pathname: `/subscription/${el._id}` ,
                        search: `?sort=${el.name}`,
                        hash: "#the-hash",
                        state: el._id,
                        
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
