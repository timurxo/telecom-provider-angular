import { Component, OnInit, Input } from '@angular/core';
import User from '../models/User';
import { UserService } from '../user.service';
import { summaryForJitFileName } from '@angular/compiler/src/aot/util';
import Swal, {SweetAlertOptions} from 'sweetalert2';

@Component({
  selector: 'app-new-device',
  templateUrl: './new-device.component.html',
  styleUrls: ['./new-device.component.css']
})
export class NewDeviceComponent implements OnInit {

  // get data from parent components
  @Input() someName = '';   // from user-info component
  @Input() planChosen = '';   // from manage-plans



  // when user submits form, we store data inside variable
  deviceToSave: User = new User();

  // inject service
  constructor(private service: UserService) { }

  // calls service class
  save(): void {
    // name property of object = name from parent class
    this.deviceToSave.name = this.someName;
    this.deviceToSave.plan = this.planChosen;


    // ********* fix
    if (!this.deviceToSave.name || !this.planChosen) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something Went Wrong!'
      } as SweetAlertOptions);
        return;
    } else {
      Swal.fire({
        icon: 'success',
        title: 'Done',
        text: 'Device has been added!'
      } as SweetAlertOptions);
    }




    this.service.save(this.deviceToSave).subscribe(data => {
      console.log(data);
      console.log("NAME: " + this.someName);
      console.log("PLAN CHOSEN: " + this.planChosen);


     
    });
  }

  ngOnInit(): void {
  }





}
