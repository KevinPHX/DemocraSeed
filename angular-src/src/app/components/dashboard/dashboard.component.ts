import { Component, OnInit, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import{DataService} from "../../data.service";
import {Data} from "../../Data";
import { AuthService } from '../../services/auth.service';
import { DomSanitizer} from '@angular/platform-browser';
import { HttpClient } from "@angular/common/http";
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [DataService]
})
export class DashboardComponent implements OnInit{
user: Object;
data: Data[];
username: String;
id: String;
intro: any;
pagetitle: any;
pagedescription: any;
videos:any;
title: any;
tasks: any;
checked=[];
step1: any;
step2: any;
step3: any;
step4: any;
step5: any;
  constructor(
    private dataService: DataService,
    private authService:AuthService,
    private http: HttpClient,
    private router:Router,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit() {
    console.log(this.authService.loggedIn())
    this.dataService.getStep1().subscribe((data: any) => {
      if(data[0] != undefined){
        this.step1 = data[0].title
      }
    })
    this.dataService.getStep2().subscribe((data: any) => {
      console.log(data[0])
      this.step2 = data[0].title
    })
    this.dataService.getStep3().subscribe((data: any) => {
      if(data[0] != undefined){
        this.step3 = data[0].title
      }
    })
    this.dataService.getStep4().subscribe((data: any) => {
      if(data[0] != undefined){
        this.step4 = data[0].title
      }
    })
    this.dataService.getStep5().subscribe((data: any) => {
      if(data[0] != undefined){
        this.step5 = data[0].title
      }
    })

    this.authService.getProfile().subscribe((profile: any) => {
      this.user = profile.user;
      this.username = profile.user.username;
      this.id = profile.user._id;
      console.log(this.id);
      this.dataService.getTasks().subscribe((data:any) => {
        this.tasks = data
      })
    },
    err => {
      console.log(err);
      return false;
    });
    this.dataService.getIntroVideos().subscribe((data: any) => {
      this.videos = data
      console.log(data)
    })
    this.dataService.getIntro().subscribe((data: any) => {
      this.intro = data
      this.pagetitle = this.intro[0].title
      this.pagedescription = this.intro[0].description
      console.log(data)
    })
  }

  embedLink(link): String {
    if (link.includes("youtube.com/watch")){
      var index = link.indexOf("=")
      var substring = link.substring(index+1)
      link = "https://youtube.com/embed/" + substring
    }
    if (link.includes("youtu.be")){
      var substring = link.substring(17)
      link = "https://youtube.com/embed/" + substring
    }
    if (link.includes("vimeo.com")){
      var substring = link.substring(18)
      link = "https://player.vimeo.com/video/" + substring
    }
    return link;
  }
  removeTask(taskid){
    this.dataService.removeTask(taskid).subscribe((data:any) => {
      if (data.success){
        console.log("success")
      } else {
        console.log("Something went wrong")
      }
    })
  }







}
