import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import User from '../models/User';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {

  constructor(private service: UserService) { }

  userToFind!: string;
 
  userList!: User;

  
  msg!:string;
  toFind!:string;
  
  clickEvent(){
    console.log(this.msg);
    this.toFind = this.msg;

    // executes function when data is back from backend --- similar to onreadystatechange
    this.service.findByUserName(this.toFind).subscribe((data) => {
      this.userList = data; // data from backend
      console.log(this.userList);
      
  });
  }


  // ---- GET DATA FROM THE SERVICE (from backend)
  ngOnInit(): void {
    // // executes function when data is back from backend --- similar to onreadystatechange
    // this.service.findByUserName(this.toFind).subscribe((data) => {
    //     this.userList = data; // data from backend
    //     console.log(this.userList);
        
    // });
  }

 

  

}
