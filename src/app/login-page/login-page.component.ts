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
  passwordToFind!: string;  // ****
  userData!: UserInf;
  userDataPlan!: Plans;
  userDataPhoneInfo!: PhoneInfo;


  msg!:string;
  msgPassword!:string;
  numberOfDevices = 0;
 
  

  // ---- GET DATA FROM THE SERVICE WHEN BUTTON IS CLICKED ----
  clickEvent(){
    console.log(this.msg);
    console.log(this.msgPassword);
    
    this.userToFind = this.msg;
    this.passwordToFind = this.msgPassword;

    if (!this.userToFind) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something Went Wrong!'
      } as SweetAlertOptions);
      return;
    }

    // get data by email
    this.service.queryUserTableByEmailAndPassword(this.userToFind, this.passwordToFind).subscribe((data) => {
      this.userData = data; 
      // set value in Service -> share with child components
      this.service.setShareUserData(this.userData);


      Swal.fire({
        icon: 'success',
        title: 'Welcome, ' + this.msg + "!",
        text: 'You have successfully logged in!'
      } as SweetAlertOptions);

       
      console.log( "USER DATA FROM BACKEND: " + this.userData);
      this.msg = '';

     

    });

    // *******
    // setTimeout(()=>{ 
    //     Swal.fire({
    //       icon: 'success',
    //       title: 'redirecting,',
    //       text: 'You have successfully logged in!'
    //     }).then(function() {
    //       window.location.href = "/userInfo";
    //     })
    // }, 4000)
    // *******

  }


  ngOnInit(): void {
    
  }

}
