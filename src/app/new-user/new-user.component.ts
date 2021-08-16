import { Component, OnInit } from '@angular/core';
import User from '../models/User';
import { UserService } from '../user.service';
import Swal, {SweetAlertOptions} from 'sweetalert2';
import UserInf from '../models/UserInf';
import UserPlans from '../models/UserPlans';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.css']
})
export class NewUserComponent implements OnInit {

  // when user submits form, we store data inside variable
  userToSave: UserInf = new UserInf();

  populateUserPlans: UserPlans = new UserPlans();

  foundId!: number;
  
  

  // inject service
  constructor(private service: UserService) { }

  // calls service class
  save(): void {

    console.log(document.getElementsByName('name'));

    // this.userToSave.pop;
    
    if (!this.userToSave.email) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something Went Wrong!'
      } as SweetAlertOptions);
        return;
    } else {
      Swal.fire({
        icon: 'success',
        title: 'Yay',
        text: 'You have registered!'
      } as SweetAlertOptions);
    }

    // insert into 'user_info' table
    this.service.addUser(this.userToSave).subscribe(data => {
      console.log(data);

    });

  

    


  }

  ngOnInit(): void {

    // this.populateUserPlans.plans_plan_id = 1;
    
  }

  updateUsersTable() {

      // get id from 'user_info'
      this.service.getUsersId(this.userToSave.email).subscribe(data => {
        console.log("USER'S ID: " + data);
        this.foundId = data;
  
      });

    this.populateUserPlans.plans_plan_id = 3;
    this.populateUserPlans.user_info_user_id = this.foundId;
    // insert into 'userplans' table (3 times with the same user_info_user_id)
    
    this.service.addUserPlans(this.populateUserPlans).subscribe(data => {
        console.log("populating userplans table: " + data);
        
    });

  }

}
