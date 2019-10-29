import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar, MatPaginator } from '@angular/material';
import { TeacherService } from './../../services/teacher.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-edit-form',
  templateUrl: './edit-form.component.html',
  styleUrls: ['./edit-form.component.scss']
})
export class EditFormComponent implements OnInit {
  quizData: []
  totalQuestion: number
  quizForm: FormGroup
  resultLength: number
  id: string

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private teacherServ: TeacherService,
    private fb: FormBuilder

  ) { }

  ngOnInit() {
    this.init()
    this.setQuizToForm()
    this.pagination()
  }

  init() {
    this.quizForm = this.fb.group({
      question: ['', Validators.required],
      possibleAnswer1: ['', Validators.required],
      possibleAnswer2: ['', Validators.required],
      possibleAnswer3: ['', Validators.required],
      possibleAnswer4: ['', Validators.required],
      correctAnswer: ['', Validators.required],
      explanation: ['', Validators.required]
    })
  }

  pagination() {
    this.paginator.page.subscribe(data => {
      this.teacherServ.getQuizById({ page: ++data.pageIndex, perPage: data.pageSize }, this.id)
        .subscribe(data => {
          this.quizData = data['docs']
          this.resultLength = data['total']
        })
    }, err => {
      this.teacherServ.errorHandler(err)
    })
  }

  setQuizToForm() {
    this.route.params.subscribe(params => {
      this.id = params['id']
      if (!this.id) {
        return
      }
      this.teacherServ.getQuizById({ page: 1, perPage: 1 }, this.id).subscribe(data => {
        if (data['docs'].length > 0) {
          this.quizData = data['docs']
          this.resultLength = data['total']
        } else {
          this.quizData = null
        }
      }, err => {
        this.teacherServ.errorHandler('Failed To Get Quiz')
      })
    })
  }

  editQuestion(questionData) {
    //check possibleAnswer
    let check = this.teacherServ.checkIfCorrectAnswerInPossible(questionData)
    if (check) {
      this.teacherServ.updateQuestionById(questionData).subscribe(data => {
        this.teacherServ.successHandle(data['message'])

      }, err => {
        this.teacherServ.errorHandler('can not update item')
      })
    }
    else {
      this.teacherServ.errorHandler('correct answer must one of possible answer')
    }
    //update
  }

  deleteQuestion(id) {
    this.teacherServ.deleteQuestion(id).subscribe(data => {
      this.teacherServ.successHandle('Question Deleted')
    }, err => {
      this.teacherServ.errorHandler('can not delete this question')
    })
  }

  backBtn() {
    this.router.navigate(['../../'], { relativeTo: this.route })
  }



}
