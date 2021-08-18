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



  // ======================================================================
  // ================== REMOVE ROW WHEN BUTTON IS CLICKED ================ 
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
 // ======================================================================

  // for update functionality
  showDiv = {
    current : false
  }



  phoneIdToUpdate = 0;
  phoneNameToUpdate = '';
  phoneNumberToUpdate = '';
  phonePlanToUpdate = 0;
 
  x: PhoneInfo = new PhoneInfo; // ***************************
  
  plansUserALreadyHas!: number[];
  
  // ======================================================================
  // =================== WHEN 'UPDATE' BUTTON IS PUSHED ===================
  // ----------- get data about user and move it to input form ------------
  updBtn(phoneInfoToUpdate: PhoneInfo) {

    this.x = phoneInfoToUpdate;

    console.log("upd btn pushed: " + phoneInfoToUpdate.phone_id);
    this.phoneIdToUpdate = phoneInfoToUpdate.phone_id;
    this.phonePlanToUpdate = phoneInfoToUpdate.userPlanId;
    this.phoneNameToUpdate = phoneInfoToUpdate.phoneName;
    this.phoneNumberToUpdate = phoneInfoToUpdate.phoneNumber;

    console.log("----- Current plan id: " + phoneInfoToUpdate.userPlanId);

    // check plans user already bought
    this.service.checkPlansUserHas(this.userData.user_id).subscribe((data) => {
      console.log('plans user actually has: ' + data);
      this.plansUserALreadyHas = data;
      
    });
    

    // 1. get userId from PhonInfo table
    // 2. check UserPlans for planId
    // 3. if new (input) planId exists -> return row from UserPlans & assign as fk in PhoneInfo
    // 4. else -> ask to buy plan first
    // checkIfUserHasThatPlan(userId)
  }

  // ======================================================================



  sendUpdToBackend: PhoneInfo = new PhoneInfo;
  newPhoneName = '';
  newPhoneNumber = '';

  // ======================================================================
  // ============ WHEN 'UPDATE PHONE INFO' BUTTON IS PUSHED ===============
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
  // ========================================================================


  // ========================================================================
  // =================== WHEN 'UPDATE PLAN' BUTTON IS PUSHED ================
  newPlan!: number;
  sendUpdWithNewPlan: PhoneInfo = new PhoneInfo;
  newFK!: number;
  updatePlan() {

    console.log("PLANS ALREADY HAS: " + this.plansUserALreadyHas);
    console.log(typeof this.plansUserALreadyHas);
    console.log("NEW PLAN: " + Number(this.newPlan));
    

      // if user haven't bought the plan yet
      if (!(this.plansUserALreadyHas.includes(Number(this.newPlan)))) {
        Swal.fire({
          icon: 'error',
          title: 'Nope',
          text: 'You need to buy a plan first'
        } as SweetAlertOptions);
          return;
      } 

      // if user already has plan -> get userplan table id where >user_id< & >planId<
      this.service.getUserPlansIdByUserIdAndPlanId(this.userData.user_id, this.newPlan).subscribe((data) => {
          console.log("ROW ID WITH UPDATED PLAN: " + data);
          // this.newFK = data;

                  // populate PhoneInfo object with updated FK and send update request
                  // this.sendUpdWithNewPlan.userPlanId = data;
                  // this.sendUpdWithNewPlan.phone_id = this.phoneIdToUpdate;
                  // this.sendUpdWithNewPlan.phoneName = this.phoneNumberToUpdate;
                  // this.sendUpdWithNewPlan.phoneNumber = this.phoneNameToUpdate;
                  this.sendUpdWithNewPlan = this.x;
                  this.sendUpdWithNewPlan.userPlanId = data;


                    this.service.updatePhoneInfo(this.sendUpdWithNewPlan, this.phoneIdToUpdate).subscribe((data) => {
                      console.log(data);
                      Swal.fire({
                        icon: 'success',
                        title: 'Done',
                        text: 'Your plan has been updated'
                      } as SweetAlertOptions);
                    
                  });




      });

     

  }


  done_btn() {

    

  }

  

}


