import { Component, OnInit } from '@angular/core';
import { UserService } from './user.service';
import UserInf from './models/UserInf';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'telecom-provider-angular';

  constructor(private service: UserService) { }

  userData: UserInf = new UserInf;

  ngOnInit(): void {
      
  }

  homeClick() {
    this.userData = this.service.getShareUserData();
  }
  
}
