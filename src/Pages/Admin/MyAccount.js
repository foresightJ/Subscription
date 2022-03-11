import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import services from '../../components/util/services';
import {Link } from 'react-router-dom';
import {Card} from 'react-bootstrap'
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
    
}
