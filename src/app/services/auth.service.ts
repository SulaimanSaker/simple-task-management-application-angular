import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Observable } from 'rxjs';
import CreateUserDto from '../dtos/create-user.dto';
import LoginUserDto from '../dtos/login-user.dto';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  serviceUrl: string = '';

  constructor(private http: HttpClient) {
    this.serviceUrl = 'http://localhost:3000/auth/';
  }

  registerUser(createUserDto: CreateUserDto): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.http.post<User>(
      this.serviceUrl + 'register',
      createUserDto,
      httpOptions
    );
  }

  loginUser(loginUserDto: LoginUserDto): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.http.post<User>(
      this.serviceUrl + 'login',
      loginUserDto,
      httpOptions
    );
  }

  logoutUser() {
    return this.http.get(this.serviceUrl + 'logout');
  }

  verifyToken(
    token: string
  ): Observable<{ success: boolean; message: string }> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      }),
    };
    return this.http.post<{ success: boolean; message: string }>(
      this.serviceUrl + 'verify',
      null,
      httpOptions
    );
  }
}
