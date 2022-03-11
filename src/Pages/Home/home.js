import React from 'react';
import NavBar from '../../components/Nav/navbar';
import List from '../../components/ListOfUsers/displayUsers'

const home = () => {
    return (
        <React.Fragment>
            <NavBar/>
        <div>
            <h2>All Users</h2>
            <List/>
            <hr/>
           
        </div>
        </React.Fragment>
    );
}

export default home;
