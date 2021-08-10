import { Component, OnInit, Input } from '@angular/core';
import User from '../models/User';
import { UserService } from '../user.service';
import { summaryForJitFileName } from '@angular/compiler/src/aot/util';

@Component({
  selector: 'app-new-device',
  templateUrl: './new-device.component.html',
  styleUrls: ['./new-device.component.css']
})
export class NewDeviceComponent implements OnInit {

  // get data from parent component
  @Input() someName = '';




  // when user submits form, we store data inside variable
  deviceToSave: User = new User();

  // inject service
  constructor(private service: UserService) { }

  // calls service class
  save(): void {
    // name property of object = name from parent class
    this.deviceToSave.name = this.someName;

    this.service.save(this.deviceToSave).subscribe(data => {
      console.log(data);
      console.log("NAME: " + this.someName);
      alert("New device has been added");
    });
  }

  ngOnInit(): void {
  }




  // clickChoosePlanA() {
  //   alert("You picked plan A");
  //   // this.deviceToSave.plan = "Plan A";
  // }

  // clickChoosePlanB() {
  //   console.log("Plan B was clicked");
  // }

  // clickChoosePlanC() {
  //   console.log("Plan C was clicked");
  // }

}
