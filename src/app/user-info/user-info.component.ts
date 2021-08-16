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
  // toFind!:string; 

  // !!!!!!!!!!!!!!!!!!!!!!
  // var dataForTable = {
  //   a: 'a';
  // };
  
  

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
      console.log( "USER DATA FROM BACKEND: " + this.userData);
      this.msg = '';

      // this.userDataPlan = this.userData.userPlans[0].plans;
      // this.userDataPhoneInfo = this.userData.userPlans[0].phoneInfo[0];
    });


      console.log('----');   
      

      console.log("userDataPlan: ---- ");
      // console.log(this.userDataPlan);
      // console.log(this.userDataPlan.cost);
      // console.log(this.userDataPlan.maxDevices);
      
      // console.log("userDataPhoneInfo: ---- ");
      // console.log(this.userDataPhoneInfo);
      // console.log(this.userDataPhoneInfo.phoneName);


      // check if device exists -> add to count
      for (var p of this.userData.userPlans) {
        
          for (var pInf of p.phoneInfo) {
              if (pInf.phoneName) {
                this.numberOfDevices++;
              }
          }
      }
      
      console.log("COUNT: " + this.numberOfDevices);
      

  }



  // ---- REMOVE ROW WHEN BUTTON IS CLICKED ---- 
  clickRemove(phoneId: any) {
    console.log("removed: " + phoneId);

    if (!phoneId) {
      alert("something went wrong");
      return;
    }

  //   this.service.delete(item.id).subscribe((data) => {    
  //     Swal.fire({
  //       icon: 'success',
  //       title: 'Done',
  //       text: 'Your device has been removed!'
  //     } as SweetAlertOptions);
  // });
    
  }

  
  ngOnInit(): void {
   
   
  }

 

  

}


