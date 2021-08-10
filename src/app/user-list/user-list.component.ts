import { Component, OnInit } from '@angular/core';
import User from '../models/User';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {


  constructor(private service: UserService) { }

  // when the component is rendered, lets tell the UserService 
  // to fetch a list of all the users from backend and then store it inside of userList
  userList!: User[];

  // ---- GET DATA FROM THE SERVICE (from backend)
  ngOnInit(): void {
    // executes function when data is back from backend --- similar to onreadystatechange
    this.service.findAll().subscribe((data) => {
        this.userList = data; // data from backend
        console.log(this.userList);
    });
  }

}
