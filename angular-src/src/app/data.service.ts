
import {mergeMap, map} from 'rxjs/operators';
import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders} from "@angular/common/http";

import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
@Injectable()
export class DataService implements OnInit {
  user:Object;
  id: String;
  constructor(private http: HttpClient, private authService: AuthService, private router: Router) {
    console.log('Data Service Initialized...');
    this.user;
  }
  getHome(){
    return this.http.get("http://localhost:3000/users/home")
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
  getIntro(){
    return this.http.get("http://localhost:3000/users/intro")
  }
  getTasks(){
    return this.authService.getProfile().pipe(mergeMap((profile: any) => {
      this.user = profile.user;
      this.id = profile.user._id;
      console.log(this.user)
      return this.http.get('http://localhost:3000/users/tasks/'+ this.id)//.pipe(map(res => res.json()));
    }))
  }
  completeTask(taskid){
    let headers = new HttpHeaders({"Content-Type": 'application/json'});
    return this.http.post('http://localhost:3000/users/complete/'+ taskid, {headers:headers})//.pipe(map(res => res.json()));
  }
  removeTask(taskid){
    let headers = new HttpHeaders({"Content-Type": 'application/json'});
    return this.http.delete('http://localhost:3000/mentors/removetask/' + taskid, {headers:headers})//.
  }
  getImages(){
    return this.http.get("http://localhost:3000/users/photo")
  }


    getStep1Videos(){
      return this.http.get("http://localhost:3000/users/step1videos")
    }
    getStep2Videos(){
      return this.http.get("http://localhost:3000/users/step2videos")
    }
    getStep3Videos(){
      return this.http.get("http://localhost:3000/users/step3videos")
    }
    getStep4Videos(){
      return this.http.get("http://localhost:3000/users/step4videos")
    }
    getStep5Videos(){
      return this.http.get("http://localhost:3000/users/step5videos")
    }
    getIntroVideos(){
      return this.http.get("http://localhost:3000/users/introvideos")
    }
    getMentorById(id){
      return this.http.get("http://localhost:3000/mentors/contact/"+ id)
    }

   ngOnInit() {

   }


   }
