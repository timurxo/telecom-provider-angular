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

  ngOnInit(): void {

  }

  showDiv = {
    current : false
  }

  

}
