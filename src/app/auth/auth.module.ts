import { AuthService } from './services/authservice.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms'

import { AuthRoutingModule } from './auth-routing.module';
import { AuthtabsComponent } from './components/authtabs/authtabs.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [AuthtabsComponent, LoginComponent, SignupComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  exports: [AuthtabsComponent, LoginComponent, SignupComponent],
  providers: [AuthService]
})
export class AuthModule { }
