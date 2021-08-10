import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import User from './models/User';
import { Observable } from 'rxjs';

// ---------- THIS SERVICE HANDLE CONNECTION TO BACKEND --------

@Injectable({
  providedIn: 'root'
})
export class UserService {

  // we gonna send calls here 
  url = 'http://localhost:8080/users/user';

  // inject http client into contructor 
  // -> now we can use http client to make calls to backend
  constructor(private httpClient: HttpClient) { }

  findAll(): Observable<User[]>{
    // send request to backend
    return this.httpClient.get<User[]>(this.url); // returns Observable - stream of data returned from backend
  }

  // findByUserName(name: string): Observable<User[]> {
  //   return this.httpClient.get<User[]>(this.url + "/name/" + name);
  // }

  findByUserName(name: string): Observable<User> {
    return this.httpClient.get<User>(this.url + "/name/" + name);
  }

  save(user: User): Observable<User>{
    return this.httpClient.post<User>(this.url, user);
  }
}
