import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders, HttpEvent, HttpErrorResponse, HttpEventType} from "@angular/common/http";

import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import {mergeMap, map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  user: String;
  id: String;
  constructor(private http: HttpClient, private authService: AuthService, private router: Router) { }
  updatePermission(id, permissions){
    let headers = new HttpHeaders({"Content-Type": 'application/json'});
    return this.http.post('http://localhost:3000/mentors/permission/' + id, permissions, {headers:headers})//.pipe(map(res => res.json()));
  }
  addTask(groupid, task){
    return this.authService.getProfile().pipe(mergeMap((profile: any) => {
    this.user = profile.user;
    this.id = profile.user._id;
    console.log(this.user)
    let headers = new HttpHeaders({"Content-Type": 'application/json'});
    return this.http.post('http://localhost:3000/mentors/task/' + this.id + "/" + groupid, task, {headers:headers})//.pipe(map(res => res.json()));  }))
    }))
  }
  findUsersbyMentor(){
    return this.authService.getProfile().pipe(mergeMap((profile: any) => {
    this.user = profile.user;
    this.id = profile.user._id;
    return this.http.get("http://localhost:3000/users/contactmentor/" + this.id)
    }))
  }
  removeTask(taskid){
    let headers = new HttpHeaders({"Content-Type": 'application/json'});
    return this.http.delete('http://localhost:3000/mentors/removetask/' + taskid, {headers:headers})//.
  }
  getTasks(groupid){
    return this.http.get('http://localhost:3000/mentors/tasks/' + groupid)//.pipe(map(res => res.json()));  }))
  }
  getStep1(){
    return this.http.get("http://localhost:3000/users/step1")
  }
  getStep2(){
    return this.http.get("http://localhost:3000/users/step2")
  }
  getStep3(){
    return this.http.get("http://localhost:3000/users/step3")
  }
  getStep4(){
    return this.http.get("http://localhost:3000/users/step4")
  }
  getStep5(){
    return this.http.get("http://localhost:3000/users/step5")
  }

}
