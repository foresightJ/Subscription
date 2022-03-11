import React,{useState, useEffect} from 'react';
import { useHistory } from "react-router-dom";


import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import './navbar.css';



const Navigationbar = (props) => {
    const history = useHistory();
    const loggedUser = props.loggedInUserId
    const [user, setUser] = useState(null)

    
  useEffect(() => {
    setUser(loggedUser)
   }, [loggedUser]) 

   const logOut = () => {
       console.log('log out')
       localStorage.removeItem("token")
        props.setUserInState(null)
        history.push('/')
   }

    return (
        <React.Fragment>

            
            <header className="header">
                <Navbar  expand="lg" >
                    <Navbar.Brand href="/">
                        MY Subscriptions
                    </Navbar.Brand>

                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto m-auto nav-bar">
                        <Nav.Link href="/my-account">My Account</Nav.Link>
                        <Nav.Link href="/addSubscription">Manage Subscription</Nav.Link>
                        {user && <Navbar.Text onClick={logOut}>Logout</Navbar.Text>}
                        {/* <Nav.Link href="/signin">SignUp</Nav.Link>
                        <Nav.Link href="/login">Login</Nav.Link> */}
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>   
              
            </header>
        </React.Fragment>
    );
}

export default Navigationbar;
