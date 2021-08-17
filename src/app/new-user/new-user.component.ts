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
  
  username!: string;
  password!: string;

  

  // inject service
  constructor(private service: UserService) { }

  // calls service class
  save(): void {

    console.log(document.getElementsByName('name'));

    this.userToSave.email = this.username;
    this.userToSave.password = this.password;

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

      this.username = '';
      this.password = '';
    });

  

    


  }

  ngOnInit(): void {
    
  }


}
