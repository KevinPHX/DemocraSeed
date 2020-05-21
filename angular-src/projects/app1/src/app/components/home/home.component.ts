import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  title: String;
  info: String;
  instructions: String;
  videolink: String;
  previewtitle: String;
  previewinfo: String;
  previewinstructions: String;
  previewvideolink: String;
  constructor(
    private flashMessage:FlashMessagesService,
    private dataService:DataService,
  ) { }

  ngOnInit(): void {
    this.dataService.getHome().subscribe((data: any) => {
      console.log(data)
      this.previewtitle = data[0].title
      this.previewinfo = data[0].info
      this.previewinstructions = data[0].instructions
      this.previewvideolink = data[0].videolink
      this.title = data[0].title
      this.info = data[0].info
      this.instructions = data[0].instructions
      this.videolink = data[0].videolink
    })
  }
  onHomeSubmit(){
    const home = {
      title: this.title,
      info: this.info,
      instructions: this.instructions,
      videolink: this.videolink,
    }
    this.dataService.postHome(home).subscribe((data: any) => {
      if (data.success){
        this.flashMessage.show("Changes successfully saved", {cssClass:'alert-success', timeout:5000});
      } else {
        this.flashMessage.show("Something went wrong", {cssClass:'alert-danger', timeout:5000});
      }
    })
  }
  

}
