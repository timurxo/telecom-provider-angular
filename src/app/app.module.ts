import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserListComponent } from './user-list/user-list.component';
import { NewUserComponent } from './new-user/new-user.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import { UserInfoComponent } from './user-info/user-info.component';
import { NewDeviceComponent } from './new-device/new-device.component';
import { ManagePlansComponent } from './manage-plans/manage-plans.component';
import { MyBillComponent } from './my-bill/my-bill.component';
import { LoginPageComponent } from './login-page/login-page.component';

@NgModule({
  declarations: [
    AppComponent,
    UserListComponent,
    NewUserComponent,
    UserInfoComponent,
    NewDeviceComponent,
    ManagePlansComponent,
    MyBillComponent,
    LoginPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, HttpClientModule, FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
