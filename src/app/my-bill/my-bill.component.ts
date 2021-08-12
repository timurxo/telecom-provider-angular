import { Component, OnInit, Input } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-my-bill',
  templateUrl: './my-bill.component.html',
  styleUrls: ['./my-bill.component.css']
})
export class MyBillComponent implements OnInit {

  constructor(private service: UserService) { }

  @Input() someName = ''; 
  userToFind = 'a';
  plansList!: string[];
  totalBill = 0;

  count2 = 0;

  ngOnInit(): void {

    this.service.getPlansByName(this.userToFind).subscribe((data) => {
      this.plansList = data; // data from backend
      console.log( "PLANS BY NAME: " + this.plansList );

    });


  }


  clickCalculateBill() {
      // calculate total bill
    for (var plan of this.plansList) {
        
      if (plan == "Single") {
        this.totalBill += 30;
        this.count2 += 1;
        
      } else if (plan == "Double") {
        // this.totalBill += 50;
        this.count2 += 1;

      } else if (plan == "Unlimited") {
        this.totalBill = 150;
      }
      
    }

    console.log("Check number of plans: " + this.count2);
  }



}
