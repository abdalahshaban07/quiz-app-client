import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import * as M from 'materialize-css'

@Component({
  selector: 'app-hometeacher',
  templateUrl: './hometeacher.component.html',
  styleUrls: ['./hometeacher.component.scss']
})
export class HometeacherComponent implements OnInit {

  allQuiz: boolean = false;
  publishedQuize: boolean = false

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.allQuiz = true;
    const tabs = document.querySelector('.tabs')
    M.Tabs.init(tabs, {})
  }

  changeTabs(value) {
    if (value === 'all-quiz') {
      this.allQuiz = true;
      this.publishedQuize = false
    }
    if (value === 'publish') {
      this.allQuiz = false;
      this.publishedQuize = true
    }
  }

}
