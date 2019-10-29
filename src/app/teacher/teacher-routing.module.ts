import { EditFormComponent } from './components/edit-form/edit-form.component';
import { UserGuard } from './../auth//services/user.guard';
import { QuizFormComponent } from './components/quiz-form/quiz-form.component';
import { HometeacherComponent } from './components/hometeacher/hometeacher.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    component: HometeacherComponent,
    canActivate: [UserGuard]
  },
  {
    path: 'new/quiz',
    component: QuizFormComponent,
    canActivate: [UserGuard]
  },
  {
    path: 'edit/:id',
    component: EditFormComponent,
    canActivate: [UserGuard]
  },
  {
    path: 'new/:id',
    component: QuizFormComponent,
    canActivate: [UserGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeacherRoutingModule { }
