import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import User from '../models/User';
import { Observable } from 'rxjs';
import Swal, {SweetAlertOptions} from 'sweetalert2';
import UserInf from '../models/UserInf';
import Plans from '../models/Plans';
import PhoneInfo from '../models/PhoneInfo';


@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {

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

    this.service.queryUserTableByEmail(this.userToFind).subscribe((data) => {
      this.userData = data; 
      // set value in Service -> share with child components
      this.service.setShareUserData(this.userData);

      console.log( "USER DATA FROM BACKEND: " + this.userData);
      this.msg = '';

    });


      console.log('----');   
      

      // display number of devices user has in total
      this.service.getNumberOfDevicesByUserId(this.userData.user_id).subscribe((data) => {
        this.numberOfDevices = data; 
        console.log("COUNT: " + this.numberOfDevices);
      });
      
      
      
      
  }



  // ---- REMOVE ROW WHEN BUTTON IS CLICKED ---- 
  clickRemove(phoneId: any) {
    console.log("removed: " + phoneId);

    if (!phoneId) {
      alert("something went wrong");
      return;
    }

    this.service.deletePhoneInfo(phoneId).subscribe((data) => {    
      Swal.fire({
        icon: 'success',
        title: 'Done',
        text: 'Your device has been removed!'
      } as SweetAlertOptions);
  });
    
  }

  
  ngOnInit(): void {

    
   
   
  }

  // share data with children components
  // dataToChildren = () => {
  //   this.service.usr.next(this.userData);
  // }

  

}


