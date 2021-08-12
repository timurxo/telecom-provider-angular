import { Component, OnInit } from '@angular/core';
import User from '../models/User';
import { UserService } from '../user.service';
import Swal, {SweetAlertOptions} from 'sweetalert2';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.css']
})
export class NewUserComponent implements OnInit {

  // when user submits form, we store data inside variable
  userToSave: User = new User();

  // inject service
  constructor(private service: UserService) { }

  // calls service class
  save(): void {

    console.log(document.getElementsByName('name'));
    
    if (!this.userToSave.name) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something Went Wrong!'
      } as SweetAlertOptions);
        return;
    } else {
      Swal.fire({
        icon: 'success',
        title: 'Yay',
        text: 'You have registered!'
      } as SweetAlertOptions);
    }

    this.service.save(this.userToSave).subscribe(data => {
      console.log(data);


    });


  }

  ngOnInit(): void {
  }

}
