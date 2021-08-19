import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewUserComponent } from './new-user/new-user.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserInfoComponent } from './user-info/user-info.component';
import { NewDeviceComponent } from './new-device/new-device.component';
import { ManagePlansComponent } from './manage-plans/manage-plans.component';
import { MyBillComponent } from './my-bill/my-bill.component';
import { LoginPageComponent } from './login-page/login-page.component';

const routes: Routes = [
  {
    path: '', redirectTo: "login", pathMatch: "full"
  },
  {
    path: 'add', component: NewUserComponent // renders this component when we go to 'add' path
  },
  {
    path: 'list', component: UserListComponent
  },
  {
    path: 'login', component: LoginPageComponent
  },
  {
    path: 'userInfo', component: UserInfoComponent
  },
  {
    path: 'userDevices', component: NewDeviceComponent
  },
  {
    path: 'managePlans', component: ManagePlansComponent
  },
  {
    path: 'myBill', component: MyBillComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
