import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import UserInf from '../models/UserInf';
import Plans from '../models/Plans';
import PhoneInfo from '../models/PhoneInfo';
import Swal, {SweetAlertOptions} from 'sweetalert2';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  constructor(private service: UserService) { }

  userToFind!: string;
  userData!: UserInf;
  userDataPlan!: Plans;
  userDataPhoneInfo!: PhoneInfo;


  msg!:string;
  numberOfDevices = 0;
 
  

  // ---- GET DATA FROM THE SERVICE WHEN BUTTON IS CLICKED ----
  clickEvent(){
    console.log(this.msg);
    this.userToFind = this.msg;

    if (!this.userToFind) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something Went Wrong!'
      } as SweetAlertOptions);
      return;
    }

    // get data by email
    this.service.queryUserTableByEmail(this.userToFind).subscribe((data) => {
      this.userData = data; 
      // set value in Service -> share with child components
      this.service.setShareUserData(this.userData);

      console.log( "USER DATA FROM BACKEND: " + this.userData);
      this.msg = '';

      Swal.fire({
        icon: 'success',
        title: 'Welcome!',
        text: 'You have successfully logged in!'
      } as SweetAlertOptions);

    });

  }


  ngOnInit(): void {
  }

}
