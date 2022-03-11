import React,{useState, useEffect} from 'react';
import Subscriptions from '../Subscriptions/AllSubs'
import Login from '../Auth/login';

const Home = (props) => {
    const loggedUser = props.loggedInUserId
    
    const [user, setUser] = useState(null)

    
  useEffect(() => {
    setUser(loggedUser)
   }, [loggedUser]) 

    return (
        <React.Fragment>
            {!user ? <Login/> : <Subscriptions/>}
        </React.Fragment>
    );
}

export default Home;
