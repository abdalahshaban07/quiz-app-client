import { TokenserviceService } from './../../../auth/services/tokenservice.service';
import { TeacherService } from './../../services/teacher.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Quiz } from './../../models/quiz';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-all-quize',
  templateUrl: './all-quize.component.html',
  styleUrls: ['./all-quize.component.scss']
})
export class AllQuizeComponent implements OnInit {
  displayedColumns = ['id', 'action']
  dataSource: Quiz[] = []

  constructor(private router: Router,
    private route: ActivatedRoute,
    private teacherSer: TeacherService,
    private tokenServ: TokenserviceService
  ) { }

  ngOnInit() {
    this.getAllQuiz()
  }



  getAllQuiz() {
    this.teacherSer.getQuiz().subscribe(data => {
      if (data.length > 0) {
        this.dataSource = data
      } else {
        this.dataSource = null
      }
    }, err => {
      this.teacherSer.errorHandler('can not get quizs')
      if (err.error.token === null) {
        this.tokenServ.DeleteToken()
      }
    })
  }


  editBtn(id) {
    this.router.navigate(['edit', id], { relativeTo: this.route })
  }
  addAnthor(id) {
    this.router.navigate(['new', id], { relativeTo: this.route })
  }

  deleteBtn(id) {
    this.teacherSer.deleteQuiz(id).subscribe(data => {
      this.getAllQuiz()
      this.teacherSer.successHandle('Quiz Deleted')
    }, err => {
      this.teacherSer.errorHandler('Failed TO Delete This Item')
    })
  }

  publish(id) {
    this.teacherSer.publishQuiz(id).subscribe(data => {
      this.getAllQuiz()
    }, err => {
      this.teacherSer.errorHandler('can not publish this item')
    })
  }

}
