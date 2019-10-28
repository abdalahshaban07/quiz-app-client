import { Component, OnInit } from '@angular/core';
import * as M from 'materialize-css'
@Component({
  selector: 'app-authtabs',
  templateUrl: './authtabs.component.html',
  styleUrls: ['./authtabs.component.scss']
})
export class AuthtabsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    const tabs = document.querySelector('.tabs')
    M.Tabs.init(tabs, {})
  }

}
