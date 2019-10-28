import { Quiz } from './../../models/quiz';
import { TeacherService } from './../../services/teacher.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-published-quize',
  templateUrl: './published-quize.component.html',
  styleUrls: ['./published-quize.component.scss']
})
export class PublishedQuizeComponent implements OnInit {
  displayedColumns = ['id', 'action']
  dataSource: Quiz[] = []
  constructor(private teacherServ: TeacherService) { }

  ngOnInit() {
    this.getAllPublishedQuiz()
  }

  getAllPublishedQuiz() {
    this.teacherServ.getPublishQuiz().subscribe(data => {
      if (data.length > 0) {
        this.dataSource = data
      } else {
        this.dataSource = null
      }
    }, err => {
      this.teacherServ.errorHandler('can not get publish quizs')
    })
  }

  deleteBtn(id) {
    this.teacherServ.deleteQuiz(id).subscribe(data => {
      this.getAllPublishedQuiz()
      this.teacherServ.successHandle('Quiz Deleted')
    }, err => {
      this.teacherServ.errorHandler('Failed TO Delete This Item')
    })
  }

}
