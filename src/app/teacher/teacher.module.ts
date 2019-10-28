import { TeacherService } from './services/teacher.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './../shared/material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TeacherRoutingModule } from './teacher-routing.module';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { HometeacherComponent } from './components/hometeacher/hometeacher.component';
import { AllQuizeComponent } from './components/all-quize/all-quize.component';
import { PublishedQuizeComponent } from './components/published-quize/published-quize.component';
import { QuizFormComponent } from './components/quiz-form/quiz-form.component';
import { EditFormComponent } from './components/edit-form/edit-form.component';


@NgModule({
  declarations: [HometeacherComponent, ToolbarComponent, AllQuizeComponent, PublishedQuizeComponent, QuizFormComponent, EditFormComponent],
  imports: [
    CommonModule,
    TeacherRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [HometeacherComponent, ToolbarComponent],
  providers: [TeacherService]
})
export class TeacherModule { }
