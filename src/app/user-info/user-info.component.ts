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
  userList!: User[];

  msg!:string;
  // toFind!:string;
  

  // ---- GET DATA FROM THE SERVICE WHEN BUTTON IS CLICKED ----
  clickEvent(){
    console.log(this.msg);
    this.userToFind = this.msg;

    if (!this.userToFind) {
      alert("User was not found!");
      return;
    }

    // executes function when data is back from backend --- similar to onreadystatechange
    this.service.findByUserName(this.userToFind).subscribe((data) => {
      this.userList = data; // data from backend
      console.log( data );
      this.msg = '';

  });
  }

  // ---- REMOVE ROW WHEN BUTTON IS CLICKED ---- 
  clickRemove(item: any) {
    console.log("removed: " + item.id);

    if (!item.id) {
      alert("something went wrong");
      return;
    }

    this.service.delete(item.id).subscribe((data) => {    
      alert("your device is removed");   
  });
    
  }

  
  ngOnInit(): void {
   
   
  }

 

  

}
