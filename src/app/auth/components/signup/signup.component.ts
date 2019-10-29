import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { TokenserviceService } from './../../services/tokenservice.service';
import { Router } from '@angular/router';
import { AuthService } from './../../services/authservice.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  signupForm: FormGroup;
  errorMessage: string;
  showSpinner: Boolean = false;

  constructor(private authoService: AuthService, private fb: FormBuilder,
    private router: Router, private tokenService: TokenserviceService) { }

  ngOnInit() {
    this.init()
  }

  init() {
    this.signupForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  signupUser() {
    this.showSpinner = true
    console.log(this.signupForm.value);
    this.authoService.registerUser(this.signupForm.value).subscribe(data => {
      // console.log(data);
      this.tokenService.SetToken(data['token'])
      // console.log(data)
      this.signupForm.reset()
      setTimeout(() => {
        this.router.navigate(['teacher'])
      }, 2000);
    }, err => {
      this.showSpinner = false
      // console.log(err)
      if (err.error.msg) {
        this.errorMessage = err.error.msg[0].message
      }
      if (err.error.message) {
        this.errorMessage = err.error.message
      }
    })
  }


}
