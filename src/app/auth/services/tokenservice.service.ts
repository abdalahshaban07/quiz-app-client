import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenserviceService {

  constructor(private router: Router) { }

  SetToken(token) {
    localStorage.setItem('token', token)
  }
  GetToken() {
    return localStorage.getItem('token')
  }
  DeleteToken() {
    localStorage.removeItem('token')
    this.router.navigate([''])
  }

  GetPayload() {
    const token = this.GetToken()
    let payload
    if (token) {
      payload = token.split('.')[1]
      payload = JSON.parse(window.atob(payload))
    }
    // console.log(payload);
    return payload.user || payload.data
  }
}
