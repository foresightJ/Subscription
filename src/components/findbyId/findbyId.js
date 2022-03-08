import React, { Component } from 'react';
import services from '../util/services';
import NavBar from '../Nav/navbar';
import {Link } from 'react-router-dom';
// import Delete from '../Delete/removeOne'


export default class findbyId extends Component {

    state = {
        data: []
    }

 
    //RETRIEVING A PARTICULAR USER
    componentDidMount() {
        const id = this.props.location.state
       services.findById(id)
        .then(user => {
            this.setState({
                data: user.data.data
            })
        })
        .catch(err => console.log(err));
    }
    
    //DELETE A USER
    deleteUser = async() => {
        const id = this.props.location.state;
       await services.remove(id)
       .then(result => {
            this.props.history.push('/')
        })
        .catch(err=> console.log(err))
    }


    render() {
        let user = this.state.data;
        return (
            <React.Fragment>
                <NavBar/>
                <section className="sign-up">
                    <div className="card mb-3" style={{maxWidth: "540px"}}>
                        <div className="row no-gutters">
                            <div className="col-md-4">
                            <img src="" className="card-img" alt="img"/>
                            </div>
                            <div className="col-md-12">
                                <div className="card-body">
                                    <h5 className="card-title">{user.FirstName} {user.LastName}</h5>
                                    <p className="card-text">{user.Address}</p>
                                    <p className="card-text">{user.Number}</p>
                                    <p className="card-text"><small className="text-muted">{user.Email}</small></p>
                                </div>
                            </div>
                        </div>
                        <div>
                        <Link to={{
                            pathname: `/edit/${user._id}` ,
                            search: `?user=${user.FirstName}${user.LastName}`,
                            state: `${user._id}`,
                            }}
                            className="btn btn-danger col-md-5">Edit Me</Link>
                            <button className="btn btn-danger col-md-5" type="submit" onClick={this.deleteUser}>Delete</button>
                        </div>
                    </div>
                </section>
            </React.Fragment>
        )
    }
}
