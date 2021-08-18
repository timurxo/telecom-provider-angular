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
 
  
  ngOnInit(): void {

    this.userData = this.service.getShareUserData();
    
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


  // for update functionality
  showDiv = {
    current : false
  }



  phoneIdToUpdate = 0;
  phoneNameToUpdate = '';
  phoneNumberToUpdate = '';
  phonePlanToUpdate = 0;
 
  

  updBtn(phoneInfoToUpdate: PhoneInfo) {
    console.log("upd btn pushed: " + phoneInfoToUpdate.phone_id);
    this.phoneIdToUpdate = phoneInfoToUpdate.phone_id;
    this.phonePlanToUpdate = phoneInfoToUpdate.userPlanId;
    
    this.phoneNameToUpdate = phoneInfoToUpdate.phoneName;
    this.phoneNumberToUpdate = phoneInfoToUpdate.phoneNumber;
    
  }

  sendUpdToBackend: PhoneInfo = new PhoneInfo;
  newPhoneName = '';
  newPhoneNumber = '';
  sendUpdateRequestToBackend() {

    this.sendUpdToBackend.phone_id = this.phoneIdToUpdate;
    this.sendUpdToBackend.phoneName = this.newPhoneName;
    this.sendUpdToBackend.phoneNumber = this.newPhoneNumber;
    this.sendUpdToBackend.userPlanId = this.phonePlanToUpdate;

    console.log("Update with: " + this.sendUpdToBackend.phone_id);
    console.log("Update with: " + this.sendUpdToBackend.phoneName);
    console.log("Update with: " + this.sendUpdToBackend.phoneNumber);
    console.log("Update with: " + this.sendUpdToBackend.userPlanId);
    
 

    // update phone info
    this.service.updatePhoneInfo(this.sendUpdToBackend, this.sendUpdToBackend.phone_id).subscribe((data) => {
      console.log("phone info was updated: " + data);

      // upd table?
      this.newPhoneName = '';
      this.newPhoneNumber = '';

      Swal.fire({
        icon: 'success',
        title: 'Done',
        text: 'Your phone info has been updated'
      } as SweetAlertOptions);
      
    });

  }
  

  

}


