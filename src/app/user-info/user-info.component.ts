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
  

  

}


