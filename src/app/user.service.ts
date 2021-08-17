import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import User from './models/User';
import { Observable, Subject } from 'rxjs';
import DATA from './models/DATA';
import UserInf from './models/UserInf';
import UserPlans from './models/UserPlans';
import PhoneInfo from './models/PhoneInfo';

// ---------- THIS SERVICE HANDLE CONNECTION TO BACKEND --------

@Injectable({
  providedIn: 'root'
})
export class UserService {

  // service to share UserInf obejct among parent-children components
  shareUserData!: UserInf;
  setShareUserData(userInf: UserInf) {
    this.shareUserData = userInf;
  }
  getShareUserData() {
    return this.shareUserData;
  }

  // we gonna send calls here 
  urlUser = 'http://localhost:8080/users/user';
  urlUserPlans = 'http://localhost:8080/usersplans/userplan';
  urlPhoneInfo = 'http://localhost:8080/phoneInfo/phone_info';
  urlPlans = 'http://localhost:8080/plans/plan';

  urlDATA = 'http://localhost:8080/data/getData';


  // ================================================================================
  // -------------------------------- USER ------------------------------------------
  // ================================================================================
  // inject http client into contructor 
  // -> now we can use http client to make calls to backend
  constructor(private httpClient: HttpClient) { }

 
  findById(id: number): Observable<DATA> {
    return this.httpClient.get<DATA>(this.urlUser + "/" + id);
  }

  addUser(user: UserInf): Observable<UserInf>{
    return this.httpClient.post<UserInf>(this.urlUser, user);
  }

  // get User's id
  getUsersId(email: string): Observable<number> {
    return this.httpClient.get<number>(this.urlUser + "/getId/" + email);
  }


// ================================================================================
  // -------------------------------- DATA ------------------------------------------
  // ================================================================================
  findAll(): Observable<DATA[]>{
    // send request to backend
    return this.httpClient.get<DATA[]>(this.urlDATA); 
  }

  queryUserTableById(id: number): Observable<UserInf> {
    return this.httpClient.get<UserInf>(this.urlDATA + "/user/" + id);
  }

  queryUserTableByEmail(email: string): Observable<UserInf> {
    return this.httpClient.get<UserInf>(this.urlDATA + "/email/" + email);
  }

 
  // addUserPlans

  // findAll(): Observable<User[]>{
  //   // send request to backend
  //   return this.httpClient.get<User[]>(this.urlUser); // returns Observable - stream of data returned from backend
  // }

  findByUserName(name: string): Observable<User[]> {
    return this.httpClient.get<User[]>(this.urlUser + "/name/" + name);
  }

  

  delete(id: number): Observable<User>{
    return this.httpClient.delete<User>(this.urlUser + "/delete/" + id);
  }

  getNumberOfDevicesByName(name: string): Observable<Number> {
    return this.httpClient.get<Number>(this.urlUser + "/count/" + name);
  }

  getPlansByName(name: string): Observable<string[]> {
    return this.httpClient.get<string[]>(this.urlUser + "/plans/" + name);
  }



  // ================================================================================
  // -------------------------------- USER PLANS ------------------------------------
  // ================================================================================
  addUserPlans(usersplans: UserPlans): Observable<UserPlans>{
    return this.httpClient.post<UserPlans>(this.urlUserPlans, usersplans);
  }
  
  getUserPlansIdByUserIdAndPlanId(userId: number, planId: number): Observable<number> {
    return this.httpClient.get<number>(this.urlUserPlans + "/" + userId + "/" + planId);
  }

  checkPlansUserHas(userId: number): Observable<number[]> {
    return this.httpClient.get<number[]>(this.urlUserPlans + "/checkPlans/" + userId);
  }

  // ================================================================================
  // -------------------------------- USER PHONE INFO -------------------------------
  // ================================================================================
  addPhoneInfo(phoneInfo: PhoneInfo): Observable<PhoneInfo>{
    return this.httpClient.post<PhoneInfo>(this.urlPhoneInfo, phoneInfo);
  }

  deletePhoneInfo(id: number): Observable<PhoneInfo>{
    return this.httpClient.delete<PhoneInfo>(this.urlPhoneInfo + "/delete/" + id);
  }

  getNumberOfDevicesByUserId(id: number): Observable<number> {
    return this.httpClient.get<number>(this.urlPhoneInfo + "/numOfDevices/" + id);
  }

  calculateTotalBillForUser(id: number): Observable<number> {
    return this.httpClient.get<number>(this.urlPhoneInfo + "/totalPrice/" + id);
  }

  getNumberOfDevicesForEachPlan(user_id: number, plan_id: number): Observable<number> {
    return this.httpClient.get<number>(this.urlPhoneInfo + "/numOfDevicesForEachPlan/" + user_id + "/" + plan_id);
  }

  // ================================================================================
  // -------------------------------- PLANS -----------------------------------------
  // ================================================================================


}
















//