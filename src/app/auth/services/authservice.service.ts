import { Auth } from './../models/auth';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
// const BASEURL = `http://localhost:3000/quiz-app`
const BASEURL = `quiz-app`

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  loginUser(body): Observable<Auth[]> {
    return this.http.post<Auth[]>(`${BASEURL}/login`, body)
  }
  registerUser(body): Observable<Auth[]> {
    return this.http.post<Auth[]>(`${BASEURL}/register`, body)

  }
}
