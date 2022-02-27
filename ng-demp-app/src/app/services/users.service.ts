import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';
import { IUsers } from '../interfaces/iusers';
import { UserClass } from '../models/user-class';
@Injectable({
  providedIn: 'root'
})

export class UsersService {


  constructor(private http: HttpClient) { }

  getAllUsers(): Observable<any> {
    const URL = `http://localhost:3004/api/users`;

    return this.http.get<any>(URL);
  }

  getSingleUser(id: number): Observable<any> {
    const URL = `http://localhost:3004/api/user/${id}`;

    return this.http.get<any>(URL);
  }

  updateSingleUser(data: UserClass): Observable<any> {
    const URL = `http://localhost:3004/api/user`;
    const throttleConfig = {
      leading: false,
      trailing: true
    }
    const body = new HttpParams()
    .set('Id', data.Id.toString())
    .set('Name', data.Name)
    .set('Email', data.Email)
    .set('Description', data.Description)
    .set('Category', data.Category.toString());
    console.log('body', body.toString())
    return this.http.put<any>(URL, body);

  }

  addSingleUser(data: IUsers): Observable<any> {
    const URL = `http://localhost:3004/api/user`;
    const throttleConfig = {
      leading: false,
      trailing: true
    }
    const body = new HttpParams()
    .set('Name', data.Name)
    .set('Description', data.Description)
    .set('Description', data.Description)
    .set('Category', data.Category.toString());

    return this.http.post<any>(URL, body.toString());

  }


  // getUsers(username: string) {
  //   return this.http.get(`http://localhost:3004/api/aduser/getaduserbyname/${username}`);
  // }

}
