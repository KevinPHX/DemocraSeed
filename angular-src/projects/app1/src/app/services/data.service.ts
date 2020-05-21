import {mergeMap, map} from 'rxjs/operators';
import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders, HttpEvent, HttpErrorResponse, HttpEventType} from "@angular/common/http";

import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient, private authService: AuthService, private router: Router) { }

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
  getTasks(groupid){
    return this.http.get('http://localhost:3000/mentors/tasks/' + groupid)//.pipe(map(res => res.json()));  }))
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




  getImages(){
    return this.http.get("http://localhost:3000/users/photo")
  }





  postHome(home){
    let headers = new HttpHeaders({"Content-Type": 'application/json'});
    return this.http.post('http://localhost:3000/administrators/home', home, {headers:headers})//.pipe(map(res => res.json()));
  }
  postStep1(step1){
    let headers = new HttpHeaders({"Content-Type": 'application/json'});
    return this.http.post('http://localhost:3000/administrators/step1', step1, {headers:headers})//.pipe(map(res => res.json()));
  }
  postStep2(step2){
    let headers = new HttpHeaders({"Content-Type": 'application/json'});
    return this.http.post('http://localhost:3000/administrators/step2', step2, {headers:headers})//.pipe(map(res => res.json()));
  }
  postStep3(step3){
    let headers = new HttpHeaders({"Content-Type": 'application/json'});
    return this.http.post('http://localhost:3000/administrators/step3', step3, {headers:headers})//.pipe(map(res => res.json()));
  }
  postStep4(step4){
    let headers = new HttpHeaders({"Content-Type": 'application/json'});
    return this.http.post('http://localhost:3000/administrators/step4', step4, {headers:headers})//.pipe(map(res => res.json()));
  }
  postStep5(step5){
    let headers = new HttpHeaders({"Content-Type": 'application/json'});
    return this.http.post('http://localhost:3000/administrators/step5', step5, {headers:headers})//.pipe(map(res => res.json()));
  }
  postIntro(intro){
    let headers = new HttpHeaders({"Content-Type": 'application/json'});
    return this.http.post('http://localhost:3000/administrators/intro', intro, {headers:headers})//.pipe(map(res => res.json()));
  }


  postStep1Videos(step1){
    let headers = new HttpHeaders({"Content-Type": 'application/json'});
    return this.http.post('http://localhost:3000/administrators/step1videos', step1, {headers:headers})//.pipe(map(res => res.json()));
  }
  postStep2Videos(step2){
    let headers = new HttpHeaders({"Content-Type": 'application/json'});
    return this.http.post('http://localhost:3000/administrators/step2videos', step2, {headers:headers})//.pipe(map(res => res.json()));
  }
  postStep3Videos(step3){
    let headers = new HttpHeaders({"Content-Type": 'application/json'});
    return this.http.post('http://localhost:3000/administrators/step3videos', step3, {headers:headers})//.pipe(map(res => res.json()));
  }
  postStep4Videos(step4){
    let headers = new HttpHeaders({"Content-Type": 'application/json'});
    return this.http.post('http://localhost:3000/administrators/step4videos', step4, {headers:headers})//.pipe(map(res => res.json()));
  }
  postStep5Videos(step5){
    let headers = new HttpHeaders({"Content-Type": 'application/json'});
    return this.http.post('http://localhost:3000/administrators/step5videos', step5, {headers:headers})//.pipe(map(res => res.json()));
  }
  postIntroVideos(intro){
    let headers = new HttpHeaders({"Content-Type": 'application/json'});
    return this.http.post('http://localhost:3000/administrators/introvideos', intro, {headers:headers})//.pipe(map(res => res.json()));
  }

  deleteVideo(id){
    let headers = new HttpHeaders({"Content-Type": 'application/json'});
    return this.http.delete('http://localhost:3000/administrators/deletevideo/'+id, {headers:headers})
  }

  orderVideos(order){
    let headers = new HttpHeaders({"Content-Type": 'application/json'});
    return this.http.post('http://localhost:3000/administrators/order', order, {headers:headers})
  }

  // postImages(images: File){
  postImages(formData){
    // const formData: FormData = new FormData();
    // formData.append('fileKey', images);
    // let headers = new HttpHeaders({"Content-Type": 'application/json'});
    return this.http.post('http://localhost:3000/administrators/photo', formData, {
      reportProgress: true,
      observe: 'events'
    })//.pipe(map(res => res.json()));
  }
  matchMentor(id, mentorid){
    let headers = new HttpHeaders({"Content-Type": 'application/json'});
    return this.http.post('http://localhost:3000/administrators/match/'+ id + "/" + mentorid , {headers:headers})
  }


}
