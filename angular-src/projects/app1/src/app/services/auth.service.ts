import {map} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {JwtHelperService} from "@auth0/angular-jwt";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authToken: any;
  user: any;
  administrator: any;
  username:string;

  constructor(private http:HttpClient) { }
  registerUser(user){
    let headers = new HttpHeaders({"Content-Type": 'application/json'});
    return this.http.post('http://localhost:3000/administrators/register', user, {headers:headers})
  }
  emailValidation(url){
    return this.http.get("http://localhost:3000/administrators/email-verification/"+url)
  }
  updateUser(id, user){
    let headers = new HttpHeaders({"Content-Type": 'application/json'});
    return this.http.post('http://localhost:3000/administrators/update/'+id, user, {headers:headers})
  }
  deleteUser(id){
      return this.http.delete('http://localhost:3000/administrators/delete/'+id)
  }
authenticateUser(user){
  let headers = new HttpHeaders({"Content-Type": 'application/json'});
  return this.http.post('http://localhost:3000/administrators/authenticate', user, {headers:headers})
}
forgotUser(user){
  let headers = new HttpHeaders({"Content-Type": 'application/json'});
  return this.http.post('http://localhost:3000/administrators/forgot', user, {headers:headers})
}

resetUser(token, user){
  let headers = new HttpHeaders({"Content-Type": 'application/json'});
  return this.http.post('http://localhost:3000/administrators/reset/'+token, user, {headers:headers})
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

findAdministrators(){
  return this.http.get("http://localhost:3000/administrators/contacts")
}

getProfile(){
  this.loadToken();
  let headers = new HttpHeaders({"Content-Type": 'application/json', "Authorization": this.authToken});
  return this.http.get('http://localhost:3000/administrators/profile', {headers:headers})
}

storeUserData(token, administrator){
  localStorage.setItem('token', token);
  localStorage.setItem('user', JSON.stringify(administrator));
  this.authToken= token;
  this.administrator=administrator;
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
  this.administrator = null;
  localStorage.clear();
}


}
