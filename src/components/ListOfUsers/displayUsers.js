import React, { Component } from 'react';
import {Link } from 'react-router-dom';
import services from '../util/services'

export default class displayUsers extends Component {

    state = {
        data: [],
    } 

    componentDidMount() {

        //DISPLAY ALL USERS
        services.find()
        .then(result => {
            this.setState({
                data: result.data.users
            })
        })
        .catch( err=> console.log(err))
    }



    render() {
       const Inventory =  this.state.data.map((el)=> {
            return (
                <div class="card" key={el._id}>
                        <img src="" class="card-img-top" alt="anImage"/>
                        <div class="card-body">
                        <h5 class="card-title">{el.FirstName} {el.LastName}</h5>
                        <p class="card-text">{el.Address} </p>
                        <p class="card-text">{el.Number} </p>
                        <p class="card-text">{el.Email} </p>
                        </div>
                        <Link to={{
                                pathname: `/findbyid/${el._id}` ,
                                search: `?sort=${el.FirstName}${el.LastName}`,
                                hash: "#the-hash",
                                state: el._id,
                               
                                }}
                                className="btn badge badge-warning"> Check Me Out</Link>
                </div>
            )
        })



        return (
            <div>
                <div className="card-group">
                    {Inventory}
                </div>
            </div>
        )
    }
}
