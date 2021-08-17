import { Component, OnInit } from '@angular/core';
import User from '../models/User';
import { UserService } from '../user.service';
import DATA from '../models/DATA';
import UserInf from '../models/UserInf';

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
  userList2!: DATA[];

  // ---- GET DATA FROM THE SERVICE (from backend)
  ngOnInit(): void {
    
   


  }

  

}
