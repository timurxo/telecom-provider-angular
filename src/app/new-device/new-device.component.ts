import { Component, OnInit, Input } from '@angular/core';
import User from '../models/User';
import { UserService } from '../user.service';
import { summaryForJitFileName } from '@angular/compiler/src/aot/util';
import Swal, {SweetAlertOptions} from 'sweetalert2';
import UserInf from '../models/UserInf';
import UserPlans from '../models/UserPlans';
import PhoneInfo from '../models/PhoneInfo';

@Component({
  selector: 'app-new-device',
  templateUrl: './new-device.component.html',
  styleUrls: ['./new-device.component.css']
})
export class NewDeviceComponent implements OnInit {

  // get data from parent components
  @Input() someName = '';   // from user-info component
  @Input() planChosen!: number;   // from manage-plans
  @Input() userData!: UserInf;
  @Input() userplansId!: number;
  

  // when user submits form, we store data inside variable
  deviceToSave: User = new User();

  phoneInfoToSave: PhoneInfo = new PhoneInfo;
  userPlansId!: number;
  

  // inject service
  constructor(private service: UserService) { }

  // calls service class
  save(): void {

    console.log("new device component");
    
    console.log(this.userData.email);
    console.log(this.userData.user_id);
    console.log(this.userData.userPlans);

    console.log("--- save device: -----");
    
    console.log(this.phoneInfoToSave.phoneName);
    console.log(this.phoneInfoToSave.phoneNumber);


    console.log(this.service.getUsersId);

 
    // save phone info 
    this.phoneInfoToSave.userPlanId = this.userplansId;
    
    this.service.addPhoneInfo(this.phoneInfoToSave).subscribe(data => {
      console.log(data);
      alert("phone info was saved")
    });

      console.log("TRYING TO SEND: " + this.phoneInfoToSave);
      console.log("TRYING TO SEND: " + this.phoneInfoToSave.phoneName);
      console.log("TRYING TO SEND: " + this.phoneInfoToSave.phoneNumber);
      console.log("TRYING TO SEND: " + this.phoneInfoToSave.userPlanId);
    

    

    // ********* fix
    // if (!this.deviceToSave.name || !this.planChosen) {
    //   Swal.fire({
    //     icon: 'error',
    //     title: 'Oops...',
    //     text: 'Something Went Wrong!'
    //   } as SweetAlertOptions);
    //     return;
    // } else {
    //   Swal.fire({
    //     icon: 'success',
    //     title: 'Done',
    //     text: 'Device has been added!'
    //   } as SweetAlertOptions);
    // }




     
    // });
  }


  ngOnInit(): void {

    console.log("UserPlans id in ngOnInit: " + this.userPlansId);

    console.log("USERPLANS ID FROM PARENT COMP: " + this.userplansId);

   
    
    
  }





}
