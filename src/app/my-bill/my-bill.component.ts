import { Component, OnInit, Input } from '@angular/core';
import { UserService } from '../user.service';
import UserInf from '../models/UserInf';

@Component({
  selector: 'app-my-bill',
  templateUrl: './my-bill.component.html',
  styleUrls: ['./my-bill.component.css']
})
export class MyBillComponent implements OnInit {

  constructor(private service: UserService) { }

  // @Input() someName = ''; 
  someName = this.service.getShareUserData().email;
  userToFind = 'a';
  plansList!: string[];
  totalBill = 0;

  // @Input() userData!: UserInf;
  userData!: UserInf;

  count2 = 0;

  ngOnInit(): void {

    this.userData = this.service.getShareUserData();

    this.service.calculateTotalBillForUser(this.userData.user_id).subscribe((data) => {
      this.totalBill = data; // data from backend
      console.log("Total bill: " + this.totalBill);
     

    });
    
    

    // this.service.getPlansByName(this.someName).subscribe((data) => {
    //   this.plansList = data; // data from backend
    //   console.log( "PLANS BY NAME: " + this.plansList );

    // });


  }


  clickCalculateBill() {
   
    
  }



}
