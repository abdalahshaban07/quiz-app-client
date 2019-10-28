import { MatSnackBar } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Quiz } from './../models/quiz';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
// const BASE_URL = `http://localhost:3000/quiz-app`
const BASE_URL = `quiz-app`

@Injectable({
  providedIn: 'root'
})
export class TeacherService {

  constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute, private snackBar: MatSnackBar) { }

  successHandle(message) {
    this.snackBar.open(message, 'Success', {
      duration: 2000
    })
  }
  errorHandler(message) {
    this.snackBar.open(message, 'Error', {
      duration: 2000
    })
  }

  checkIfCorrectAnswerInPossible(value) {
    //if create Quiz
    let arr = [value]
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < 4; j++) {
        if (arr[i]['correctAnswer'] === arr[i][`possibleAnswer${j + 1}`]) {
          return true
        }
      }
      return false
    }
  }


  createQuiz(body: Quiz[]): Observable<any> {
    return this.http.post<any>(`${BASE_URL}/add-quiz`, body)
  }

  getQuiz(): Observable<any> {
    return this.http.get<any>(`${BASE_URL}/all-quiz`)
  }

  deleteQuiz(id: string): Observable<any> {
    return this.http.post<any>(`${BASE_URL}/delete-quiz`, { id })
  }

  getQuizById({ page = 1, perPage = 1 }, id: any): Observable<any> {
    return this.http.post<any>(`${BASE_URL}/get-quiz?page=${page}&perPage=${perPage}`, { id })
  }
  // getQuizById(id: string): Observable<Quiz> {
  //   return this.http.post<Quiz>(`${BASE_URL}/get-quiz`, { id })
  // }

  updateQuestionById(body): Observable<any> {
    return this.http.put<any>(`${BASE_URL}/update-question`, body)
  }

  deleteQuestion(id: string): Observable<any> {
    return this.http.delete<any>(`${BASE_URL}/delete-question/${id}`)
  }

  publishQuiz(id): Observable<any> {
    return this.http.put<any>(`${BASE_URL}/publish-quiz`, { id })
  }

  getPublishQuiz(): Observable<any> {
    return this.http.get<any>(`${BASE_URL}/get-publish`)
  }
}
