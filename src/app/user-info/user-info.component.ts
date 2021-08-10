import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import User from '../models/User';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {

  constructor(private service: UserService) { }

  userToFind!: string;
 
  userList!: User;


  // ---- GET DATA FROM THE SERVICE (from backend)
  ngOnInit(): void {
    // executes function when data is back from backend --- similar to onreadystatechange
    this.service.findByUserName("a").subscribe((data) => {
        this.userList = data; // data from backend
        console.log(this.userList);
        
    });
  }

  

}
