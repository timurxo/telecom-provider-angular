import { Component, OnInit, Input } from '@angular/core';
import UserInf from '../models/UserInf';
import UserPlans from '../models/UserPlans';
import { UserService } from '../user.service';

@Component({
  selector: 'app-manage-plans',
  templateUrl: './manage-plans.component.html',
  styleUrls: ['./manage-plans.component.css']
})
export class ManagePlansComponent implements OnInit {

  @Input() userData!: UserInf;
  @Input() someName = '';   // name of user from user-info component
  // planChosen = 'No Plan';
  planChosen = 1;

  populateUserPlans: UserPlans = new UserPlans();


  constructor(private service: UserService) { }

  ngOnInit(): void {

    // userId column in Userplans table
    this.populateUserPlans.user_info_user_id = this.userData.user_id;

  }

  clickEventA() {
    console.log("BUTTON A CLICKED");
    this.planChosen = 1;
    this.populateUserPlans.plans_plan_id = 1;


  }

  clickEventB() {
    console.log("BUTTON B CLICKED");
    this.planChosen = 2;
    this.populateUserPlans.plans_plan_id = 2;

    
  }


  clickEventC() {
    console.log("BUTTON C CLICKED");
    this.planChosen = 3;
    this.populateUserPlans.plans_plan_id = 3;
  }

  clickPopulateUserplansTable() {

    // populate userplans table
    console.log("userplans data to send: ");
    
    console.log(this.populateUserPlans.user_info_user_id);
    console.log(this.populateUserPlans.plans_plan_id);

    this.service.addUserPlans(this.populateUserPlans).subscribe(data => {
      console.log("populating userplans table: " + data);
      
    });

    
  }

  // GET USERPLANS ID SO WE CAN USE IT AS A FOREIGN KEY IN PHONE_INFO TABLE
  userplansId!: number;
  getUserplansId() {
    //  get userplans id where userid = user_id & plansId = planChosen
    this.service.getUserPlansIdByUserIdAndPlanId(this.userData.user_id, this.planChosen).subscribe(data => {
      console.log("data from backend: " + data);
      this.userplansId = data;
      console.log("UserPlans id: " + this.userplansId);

      
    });
  }


}
