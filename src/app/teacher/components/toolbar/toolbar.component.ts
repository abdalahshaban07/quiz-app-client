import { Router, ActivatedRoute } from '@angular/router';
import { TokenserviceService } from './../../../auth/services/tokenservice.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  constructor(private tokenService: TokenserviceService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    const token = this.tokenService.GetToken()
    if (!token) {
      this.router.navigate([''])
    }
  }

  saveBtn() {
    this.router.navigate(['new'], { relativeTo: this.route })
  }
  logout() {
    this.tokenService.DeleteToken()
  }

}
