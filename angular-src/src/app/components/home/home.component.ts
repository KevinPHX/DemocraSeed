import { Component, OnInit, HostBinding  } from '@angular/core';
import {  trigger, state, style, animate, transition} from '@angular/animations';
import{DataService} from "../../data.service";
import { DomSanitizer} from '@angular/platform-browser';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  Home: any;
  title: any;
  info: any;
  instructions: any;
  videolink: any;
  images: any;
  constructor(private dataService:DataService, private sanitizer: DomSanitizer,) { }

  ngOnInit() {
    this.dataService.getHome().subscribe((home: any) => {
      console.log(home)
      this.Home = home[0]
      this.title = this.Home.title
      this.info = this.Home.info
      this.instructions = this.Home.instructions
      this.videolink = this.Home.videolink
      if (this.videolink.includes("youtube.com/watch")){
        var index = this.videolink.indexOf("=")
        console.log(index)
        var substring = this.videolink.substring(index+1)
        this.videolink = "https://youtube.com/embed/" + substring
      }
      if (this.videolink.includes("youtu.be")){
        var substring = this.videolink.substring(17)
        this.videolink = "https://youtube.com/embed/" + substring
      }
      if (this.videolink.includes("vimeo.com")){
        var substring = this.videolink.substring(18)
        this.videolink = "https://player.vimeo.com/video/" + substring
      }
      this.videolink = this.sanitizer.bypassSecurityTrustResourceUrl(this.videolink)
      console.log(this.videolink)
    })
    this.dataService.getImages().subscribe((photos: any) => {
      this.images = photos
      for (let image of this.images) {
           image.imageData = 'data:image/png;base64,' + image.img.data;
       }
    })
  }
  refresh(): void {
    window.location.reload();
  }

}
