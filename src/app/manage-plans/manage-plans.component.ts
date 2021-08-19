import { Component, OnInit, Input } from '@angular/core';
import UserInf from '../models/UserInf';
import UserPlans from '../models/UserPlans';
import { UserService } from '../user.service';
import Swal, {SweetAlertOptions} from 'sweetalert2';

@Component({
  selector: 'app-manage-plans',
  templateUrl: './manage-plans.component.html',
  styleUrls: ['./manage-plans.component.css']
})
export class ManagePlansComponent implements OnInit {

  // @Input() userData!: UserInf;
  userData!: UserInf;
  // @Input() someName = '';   // name of user from user-info component
  // planChosen = 0;
  planChosen!: number;   // ********************

  populateUserPlans: UserPlans = new UserPlans();

  plansUserAlreadyHas!: number[];

  constructor(private service: UserService) { }

  asd!: UserInf;

  ngOnInit(): void {

    console.log("CHECK SHARING DATA: " + this.service.getShareUserData().email);
    this.userData = this.service.getShareUserData();
    

    // userId column in Userplans table
    this.populateUserPlans.user_info_user_id = this.userData.user_id;

    // check planID's user already has
    this.service.checkPlansUserHas(this.userData.user_id).subscribe(data => {
      console.log("PLANS USER ALREADY HAS: " + data);
      this.plansUserAlreadyHas = data;
      
    });

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

    console.log("this.planChosen = " + this.planChosen);
    

    // if plan isn't picked
    if (!this.planChosen || this.planChosen == undefined) {
      Swal.fire({
        icon: 'error',
        title: 'nope',
        text: 'Pick a plan first'
      } as SweetAlertOptions);

        return;
    }

    // if user already has that plan -> exit function
    if (this.plansUserAlreadyHas.includes(this.populateUserPlans.plans_plan_id)) {
      Swal.fire({
        icon: 'error',
        title: 'nope',
        text: 'You already bought this plan'
      } as SweetAlertOptions);

        return;
    }

    // add plan if user doesn't have it yet
    this.service.addUserPlans(this.populateUserPlans).subscribe(data => {
      console.log("populating userplans table: " + data);

      Swal.fire({
        icon: 'success',
        title: 'Done',
        text: 'You added plan ' + data.plans_plan_id
      } as SweetAlertOptions);
      
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

      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'You can now add a phone info!'
      } as SweetAlertOptions);


    });



    // if userplans id isn't found
    if (this.userplansId ==null || this.userplansId == undefined || !this.userplansId) {
          Swal.fire({
            icon: 'error',
            title: 'nope',
            text: 'Choose the plan first'
          } as SweetAlertOptions);

          return;
    }

    
  }


}
