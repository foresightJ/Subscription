import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import services from '../../components/util/services';
import NavBar from '../../components/Nav/navbar';
import {Link } from 'react-router-dom';
import {Card, Col, Row, Button} from 'react-bootstrap'
// import Delete from '../Delete/removeOne'


export default function MyAccount (props) {
    const history = useHistory();
    const data = props.loggedInUserId
    const [user, setUser] = useState()
    // state = {
    //     data: this.props.loggedInUser
    // }

    useEffect( () => {
        setUser(data) 

    },[data])
 
    //RETRIEVING A PARTICULAR USER
    // componentDidMount() {
    //     const id = this.props.loggedInUserId
    //    services.findById(id)
    //     .then(user => {
    //         this.setState({
    //             data: user.data.data
    //         })
    //     })
    //     .catch(err => console.log(err));
    // }
    
    //DELETE A USER
    const deleteUser = async(id) => {
       await services.remove(id)
       .then(result => {
        props.setUserInState(null)
        localStorage.removeItem("token")
        history.push('/')
        })
        .catch(err=> console.log(err))
    }
    return( 
        <>
                    {user && 
            <Card>
                <Card.Header>
                    <div style={{display: "flex", justifyContent: "space-between"}}>
                        <p>My Info</p>
                        <p>Welcome {user.firstName}</p>
                    </div>
                </Card.Header>
                <Card.Body>
                    <>
                    <Card.Title>Special title treatment</Card.Title>
                    <Card.Text>
                    </Card.Text>
                    <div style={{display: "flex", justifyContent: "space-between"}}>
                    <Link to={{
                        pathname: `/edit/${user._id}` ,
                        search: `?user=${user.firstName}${user.lastName}`,
                        state: `${user._id}`,
                        }}
                        className="btn btn-warning ">
                            Edit My Info
                    </Link>
                    <button className="btn btn-danger" type="submit" onClick={() => deleteUser(user._id)}>Delete My Account</button>
                    </div>
                    </>
                    
                    
                </Card.Body>
            </Card>
                    }
        </>
    
    )


        // return (
        //     <React.Fragment>
        //     {/* //     <section className="sign-up">
        //     //         <div className="card mb-3" style={{maxWidth: "540px"}}>
        //     //             <div className="row no-gutters">
        //     //                 <div className="col-md-4">
        //     //                 <img src="" className="card-img" alt="img"/>
        //     //                 </div>
        //     //                 <div className="col-md-12">
        //     //                     <div className="card-body">
        //     //                         <h5 className="card-title">{user.FirstName} {user.LastName}</h5>
        //     //                         <p className="card-text">{user.Address}</p>
        //     //                         <p className="card-text">{user.Number}</p>
        //     //                         <p className="card-text"><small className="text-muted">{user.Email}</small></p>
        //     //                     </div>
        //     //                 </div>
        //     //             </div>
        //     //         <div> */}
        //     //             <Link to={{
        //     //                 pathname: `/edit/${user._id}` ,
        //     //                 search: `?user=${user.firstName`,
        //     //                 state: `${user._id}`
        //     //                 }}
        //     //                 className="btn btn-danger col-md-5">Edit Me</Link>
        //     //                 <button className="btn btn-danger col-md-5" type="submit" onClick={deleteUser}>Delete</button>
        //     //             </div>
        //     //         </div>
        //     //     </section>
        //     </React.Fragment>
        // )
    
}
