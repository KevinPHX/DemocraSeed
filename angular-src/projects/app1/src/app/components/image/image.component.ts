import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { DataService } from '../../services/data.service';
import { HttpEventType, HttpErrorResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.css']
})
export class ImageComponent implements OnInit {
  // fileToUpload: File = null;
  @ViewChild("fileUpload", {static: false}) fileUpload: ElementRef;files  = [];
  constructor(
    private dataService:DataService,
  ) { }

  ngOnInit(): void {
    this.dataService.getImages().subscribe((data:any)=> {
      this.files = data
      for (let file of this.files) {
           file.imageData = 'data:image/png;base64,' + file.img.data;
       }
    })
  }

  // handleFileInput(files: FileList) {
  //   console.log(files)
  //   this.fileToUpload = files.item(0);
  // }
  //
  // uploadFileToActivity() {
  //   console.log(this.fileToUpload)
  //   this.dataService.postImages(this.fileToUpload).subscribe((data:any) => {
  //     console.log("Success")
  //     // do something, if upload success
  //     }, error => {
  //       console.log(error);
  //     });
  // }
  uploadFile(file) {
    console.log(file)
    const formData = new FormData();
    formData.append('file', file.data);
    file.inProgress = true;
    this.dataService.postImages(formData).pipe(
      map(event => {
        switch (event.type) {
          case HttpEventType.UploadProgress:
            file.progress = Math.round(event.loaded * 100 / event.total);
            break;
          case HttpEventType.Response:
            return event;
        }
      }),
      catchError((error: HttpErrorResponse) => {
        file.inProgress = false;
        return of(`${file.data.name} upload failed.`);
      })).subscribe((event: any) => {
        if (typeof (event) === 'object') {
          console.log(event.body);
        }
      });
  }

  private uploadFiles() {
    this.fileUpload.nativeElement.value = '';
    this.files.forEach(file => {
      this.uploadFile(file);
    });
}
  onClick() {
      const fileUpload = this.fileUpload.nativeElement;fileUpload.onchange = () => {
      for (let index = 0; index < fileUpload.files.length; index++)
      {
       const file = fileUpload.files[index];
       this.files.push({ data: file, inProgress: false, progress: 0});
      }
        this.uploadFiles();
      };
      fileUpload.click();
  }

}
