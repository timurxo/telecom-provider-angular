import { Component, OnInit } from '@angular/core';
import User from '../models/User';
import { UserService } from '../user.service';
import DATA from '../models/DATA';
import UserInf from '../models/UserInf';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {


  constructor(private service: UserService) { }

  // when the component is rendered, lets tell the UserService 
  // to fetch a list of all the users from backend and then store it inside of userList
  userList!: User[];
  userList2!: DATA[];

  // ---- GET DATA FROM THE SERVICE (from backend)
  ngOnInit(): void {
    // executes function when data is back from backend --- similar to onreadystatechange
    this.service.findAll().subscribe((data) => {
        this.userList2 = data; // data from backend
        console.log("------- ALL DATA FROM BACKEND ------- " ); 

        console.log(this.userList2[0]);

        console.log(this.userList2[1].userPlans);
        console.log(this.userList2[2]);
        console.log(this.userList2[3]);
        // console.log(this.userList2[4]);

    });


   


  }


  myUserInfo!: UserInf;
  // userList3!: UserInf;

  checkUserDataById() {
    console.log('$$$$$$$$$$$$$$$$--');
    // console.log(this.userList2);
    // console.log(this.userList2[1]);

    this.service.queryUserTableById(2).subscribe((data) => {
        this.myUserInfo = data;

        console.log("single data from backend");
        console.log(this.myUserInfo);
        
        console.log("--- user table ----");
        
        console.log(this.myUserInfo.email);
        console.log(this.myUserInfo.password);
        

        console.log("--- User Plans table ----");
        console.log(this.myUserInfo.userPlans);
        
        // console.log(this.myUserInfo.userPlans.phoneInfo.phone_id);

        console.log(this.myUserInfo.userPlans);

        console.log("------ phone info ------ ");
        console.log(this.myUserInfo.userPlans[0]);
        console.log(this.myUserInfo.userPlans[0].userplan_id);
        console.log(this.myUserInfo.userPlans[0].phoneInfo);

        // // *** needed info
        // console.log(this.myUserInfo.userPlans[0].phoneInfo[0].phoneNumber);
        // console.log(this.myUserInfo.userPlans[0].phoneInfo[0].phoneName);
        // console.log(this.myUserInfo.userPlans[0].phoneInfo[0].phone_id);

        console.log("----- plans ------");
        console.log(this.myUserInfo.userPlans[0].plans.cost);
        console.log(this.myUserInfo.userPlans[0].plans.plan_id);
        console.log(this.myUserInfo.userPlans[0].plans.maxDevices);
        
 
    });


    
   
    
    
  }


  myUserInfo2!: UserInf;
  checkUserDataByEmail() {

    this.service.queryUserTableByEmail("Timur").subscribe((data) => {
      this.myUserInfo2 = data;

        console.log("single data from backend");
        console.log(this.myUserInfo2);
        
        console.log("--- user table ----");
        
        console.log(this.myUserInfo2.email);
        console.log(this.myUserInfo2.password);
        

        console.log("--- User Plans table ----");
        console.log(this.myUserInfo2.userPlans);


    });
  }

  

}
