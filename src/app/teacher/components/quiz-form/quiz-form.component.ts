import { TeacherService } from './../../services/teacher.service';
import { Quiz } from './../../models/quiz';
import { MatSnackBar } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-quiz-form',
  templateUrl: './quiz-form.component.html',
  styleUrls: ['./quiz-form.component.scss']
})
export class QuizFormComponent implements OnInit {

  quizForm: FormGroup;
  questions = new Array()
  possiblenswer: any
  quizData: []
  totalQuestion: number
  constructor(private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private teacherServ: TeacherService
  ) { }

  ngOnInit() {
    this.init()
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

  saveForm() {
    //create Quiz
    let check = this.teacherServ.checkIfCorrectAnswerInPossible(this.quizForm.value)
    if (check) {
      this.questions = [...this.questions, this.quizForm.value]
      this.teacherServ.createQuiz(this.questions).subscribe(data => {
        this.router.navigate(['../'], { relativeTo: this.route })
        this.teacherServ.successHandle('Quiz Created')
      }, err => {
        return this.errorHandler('can not save this quiz')
      })
    }
    else {
      return this.errorHandler('Correct Answer must in Possible Answer')
    }
  }

  anthorQuestion() {
    let check = this.teacherServ.checkIfCorrectAnswerInPossible(this.quizForm.value)
    if (check) {
      this.questions = [...this.questions, this.quizForm.value]
      return this.quizForm.reset()
    }
    else {
      return this.errorHandler('Correct Answer must in Possible Answer')
    }
  }

  backBtn() {
    this.router.navigate(['../'], { relativeTo: this.route })
  }

  errorHandler(message) {
    this.snackBar.open(message, 'Error', {
      duration: 2000
    })
  }

}
