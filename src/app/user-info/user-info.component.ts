import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import User from '../models/User';
import { Observable } from 'rxjs';
import Swal, {SweetAlertOptions} from 'sweetalert2';


@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {

  constructor(private service: UserService) { }

  userToFind!: string;
  userList!: User[];

  numberOfDevices!: Number;

  msg!:string;
  // toFind!:string; 
  

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
      // alert("User was not found! -" + this.userToFind);
      return;
    }

    // executes function when data is back from backend --- similar to onreadystatechange
    this.service.findByUserName(this.userToFind).subscribe((data) => {
      this.userList = data; // data from backend
      console.log( "USER DATA FROM BACKEND: " + this.userList[0].name );

      // ************* fix
      
      // if (!(this.userList[0].name == this.msg)) {
      //   alert("oops");
      //   return;
      // }


      this.msg = '';

    });



    // get number of records (devices user has)
    this.service.getNumberOfDevicesByName(this.userToFind).subscribe((data) => {
   
      this.numberOfDevices = data;

      console.log("Number of rows: " + this.numberOfDevices );

    });





  }

  // ---- REMOVE ROW WHEN BUTTON IS CLICKED ---- 
  clickRemove(item: any) {
    console.log("removed: " + item.id);

    if (!item.id) {
      alert("something went wrong");
      return;
    }

    this.service.delete(item.id).subscribe((data) => {    
      Swal.fire({
        icon: 'success',
        title: 'Done',
        text: 'Your device has been removed!'
      } as SweetAlertOptions);
  });
    
  }

  
  ngOnInit(): void {
   
   
  }

 

  

}
