import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-manage-plans',
  templateUrl: './manage-plans.component.html',
  styleUrls: ['./manage-plans.component.css']
})
export class ManagePlansComponent implements OnInit {

  @Input() someName = '';   // name of user from user-info component
  planChosen = 'No Plan';


  constructor() { }

  ngOnInit(): void {

  }

  clickEventA() {
    console.log("BUTTON A CLICKED");
    this.planChosen = 'Single';
  }

  clickEventB() {
    console.log("BUTTON B CLICKED");
    this.planChosen = 'Double';
  }


  clickEventC() {
    console.log("BUTTON C CLICKED");
    this.planChosen = 'Unlimited';
  }


}
