import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { HttpClient } from "@angular/common/http";

@Component({
  selector: 'app-email-verification',
  templateUrl: './email-verification.component.html',
  styleUrls: ['./email-verification.component.css']
})
export class EmailVerificationComponent implements OnInit {
  url: String;
  href: String;
  constructor(private authService:AuthService, private router:Router, private http:HttpClient) { }

  ngOnInit(): void {
    this.href = this.router.url;
    console.log(this.href)
    this.url = this.href.substring(25);
    console.log(this.url)
    this.authService.emailValidation(this.url).subscribe(data => {
      if (data) {
        console.log("success")
      } else {
        console.log("failure")
      }
    })
  }

}
