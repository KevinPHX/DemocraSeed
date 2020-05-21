import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-step2',
  templateUrl: './step2.component.html',
  styleUrls: ['./step2.component.css']
})
export class Step2Component implements OnInit {
  step2: any;
  videos: any;
  pagetitle: String;
  pagedescription: String;
  title: String;
  videolink: String;
  description: String;
  docname: String;
  doclink: String;
  constructor(
    private dataService: DataService,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    this.dataService.getStep2Videos().subscribe((data: any) => {
      this.videos = data
      console.log(data)
    })
    this.dataService.getStep2().subscribe((data: any) => {
      this.step2 = data
      this.pagetitle = this.step2[0].title
      this.pagedescription = this.step2[0].description
      console.log(data)
    })
  }

  onStep2Submit(){
    const step2 = {
      title: this.pagetitle,
      description: this.pagedescription
    }
    this.dataService.postStep2(step2).subscribe((data:any) => {
      if (data.success) {
        console.log(data)
        window.location.reload();
      } else {
        console.log("error")
      }
    })
  }

  onVideoSubmit(){
    const video = {
      title: this.title,
      videolink: this.videolink,
      description: this.description,
      docname: this.docname,
      doclink: this.doclink
    }
    this.dataService.postStep2Videos(video).subscribe((data:any) => {
      if (data.success) {
        console.log(data)
        window.location.reload();
      } else {
        console.log("error")
      }
    })
  }


  moveUp(value, index) {
    if (index >= 1) {
      const tmp = this.videos[index - 1];
      this.videos[index - 1] = this.videos[index];
      this.videos[index] = tmp;
    }
  }

  moveDown(value, index) {
    if (index < this.videos.length-1) {
      const tmp = this.videos[index + 1];
      this.videos[index + 1] = this.videos[index];
      this.videos[index] = tmp;
    }
  }

  saveOrder(){
    var _id = []
    var index = []
    for (var i = 0; i < this.videos.length; i++){
      _id.push(this.videos[i]._id)
      index.push(i)
    }

    const order = {
      _id: _id,
      index: index
    }
    console.log(order)
    this.dataService.orderVideos(order).subscribe((data:any) => {
      if (data.success) {
        console.log(data)
        window.location.reload();
      } else {
        console.log("error")
      }
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
  deleteVideo(id){
    this.dataService.deleteVideo(id).subscribe((data:any) => {
      if (data.success) {
        console.log(data)
        window.location.reload();
      } else {
        console.log("error")
      }
    })
  }
}
