
import {map} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import {JwtHelperService} from "@auth0/angular-jwt";

@Injectable()
export class AuthService {
  authToken: any;
  user: any;
  username:string;

  constructor(private http:HttpClient) { }
  registerUser(user){
    let headers = new HttpHeaders({"Content-Type": 'application/json'});
    return this.http.post('http://localhost:3000/users/register', user, {headers:headers})
  }
  emailValidation(url){
    return this.http.get("http://localhost:3000/users/email-verification/"+url)
  }
  updateUser(id, user){
    let headers = new HttpHeaders({"Content-Type": 'application/json'});
    return this.http.post('http://localhost:3000/users/update/'+id, user, {headers:headers})
  }
  deleteUser(id){
      return this.http.delete('http://localhost:3000/users/delete/'+id)
  }
authenticateUser(user){
  let headers = new HttpHeaders({"Content-Type": 'application/json'});
  return this.http.post('http://localhost:3000/users/authenticate', user, {headers:headers})
}
forgotUser(user){
  let headers = new HttpHeaders({"Content-Type": 'application/json'});
  return this.http.post('http://localhost:3000/users/forgot', user, {headers:headers})
}

resetUser(token, user){
  let headers = new HttpHeaders({"Content-Type": 'application/json'});
  return this.http.post('http://localhost:3000/users/reset/'+token, user, {headers:headers})
}

findUsers(){
  return this.http.get("http://localhost:3000/users/contacts")
}

findUser(id){
  return this.http.get("http://localhost:3000/users/contact/" + id)
}

findMentors(){
  return this.http.get("http://localhost:3000/mentors/contacts")
}

getProfile(){
  this.loadToken();
  let headers = new HttpHeaders({"Content-Type": 'application/json', "Authorization": this.authToken});
  return this.http.get('http://localhost:3000/users/profile', {headers:headers})
}

storeUserData(token, user){
  localStorage.setItem('token', token);
  localStorage.setItem('user', JSON.stringify(user));
  this.authToken= token;
  this.user=user;
}

loadToken(){
  const token = localStorage.getItem('token');
  this.authToken = token;
  console.log(token)
}

loggedIn(){
  //console.log(tokenNotExpired());
  const token = localStorage.getItem('token');
  const helper = new JwtHelperService();
  return helper.isTokenExpired(token);
  console.log(token)
}

logout(){
  this.authToken = null;
  this.user = null;
  localStorage.clear();
}


}
