import http from './http-commons';

class StuffDataService {

  //create new data
  create(data) {
    return http.post("/api", data);
  }
  // get all data
  find() {
    return http.get("/");
  }

  //get single data
  findById(id) {
    return http.get(`/api/${id}`);
  }
  
  // get single data to edit
  findOne(id) {
    return http.get(`/edit/${id}`);
  }

//post edited data
  postEdit(id, data) {
    return http.post(`/edit/${id}`, data);
  }

  // post delete
  remove(id) {
    return http.post(`/api/${id}`);
  }

  //login
  postLogin(data) {
    return http.post(`/api/user/login`, data);
  }
 
// SUBSCRIPTIONS

  // create subscription
  createSub(id, data) {
    return http.post(`/api/createSub/${id}`, data);
  }
   // get all subscriptions
  findAllSubs(id) {
    return http.get(`/api/subscriptions/${id}`);
  }
  // this retrieves a single subscription
  findSubsById(id) {
    return http.get(`/api/subscription/${id}`);
  }

 // update a particular subscription
  updateSubs(id, data) {
    return http.post(`/edit/subscription/${id}`, data);
  }
  //delete a subscription
  removeSub(id) {
    return http.post(`/api/removeSub/${id}`);
  }
}

export default new StuffDataService();