import { Component, OnInit } from '@angular/core';
import User from '../models/User';
import { UserService } from '../user.service';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.css']
})
export class NewUserComponent implements OnInit {

  // when user submits form, we store data inside variable
  userToSave: User = new User();

  // inject service
  constructor(private service: UserService) { }

  // calls service class
  save(): void {

    console.log(document.getElementsByName('name'));
    
    if (!this.userToSave.name) {
        alert("try again");
        return;
    }



    this.service.save(this.userToSave).subscribe(data => {
      console.log(data);

    });
  }

  ngOnInit(): void {
  }

}
