import { TokenserviceService } from './../../services/tokenservice.service';
import { AuthService } from './../../services/authservice.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup
  errorMessage: String;
  showSpinner: Boolean = false


  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router,
    private tokenService: TokenserviceService) { }

  ngOnInit() {
    this.init()
  }

  init() {

    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    })
  }
  loginUser() {
    this.showSpinner = true
    this.authService.loginUser(this.loginForm.value).subscribe(data => {
      // console.log(data)
      this.tokenService.SetToken(data['token'])
      this.loginForm.reset()
      setTimeout(() => {
        this.router.navigate(['teacher'])
      }, 2000);
    }, err => {
      this.showSpinner = false
      // console.log(err)
      if (err.error.message) {
        this.errorMessage = err.error.message
      }
    })
  }

}
