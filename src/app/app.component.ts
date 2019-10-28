import { Router } from '@angular/router';
import { TokenserviceService } from './auth/services/tokenservice.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'quiz-app-client';
  constructor(private tokenService: TokenserviceService, private router: Router) { }

  ngOnInit() {
    const token = this.tokenService.GetToken()
    if (token) {
      this.router.navigate(['/teacher'])
    } else {
      this.router.navigate([''])
    }
  }
}
