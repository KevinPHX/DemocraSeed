import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service'
import { DataService } from '../../services/data.service'
import { FilterPipe } from 'ngx-filter-pipe';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  users: any;
  filter: any = {groupname: ""}
  progress: String;
  step1: any;
  step2: any;
  step3: any;
  step4: any;
  step5: any;
  tasks: any = [];
  constructor(
    private authService: AuthService,
    private dataService: DataService,
  ) { }

  ngOnInit(): void {
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
    this.dataService.findUsersbyMentor().subscribe((data: any) => {
      this.users = data
      console.log(this.users)
      for (var i = 0; i < this.users.length; i++){
        this.dataService.getTasks(this.users[i]._id).subscribe((data:any) => {
          this.tasks.push(data.slice(0, 3))
        })
      }
    })
  }

  findProgress(user): String {
    var permission1 = user.permission1
    var permission2 = user.permission2
    var permission3 = user.permission3
    var permission4 = user.permission4
    var permission5 = user.permission5
    var progress = ""
    if (permission1 == false){
      progress = "None"
    }
    if (permission1 == true && permission2 == false){
      progress = this.step1
    }
    if (permission2 == true && permission3 == false){
      progress = this.step2
    }
    if (permission3 == true && permission4 == false){
      progress = this.step3
    }
    if (permission4 == true && permission5 == false){
      progress = this.step4
    }
    if (permission5 == true){
      progress = this.step5
    }
    return progress
  }
  //
  // getFirstTasks(id): any {
  //   console.log(id)
  //   this.dataService.getTasks(id).subscribe((data:any) => {
  //     var firsttasks = data.slice(0, 3)
  //     return firsttasks
  //   })
  // }

}
