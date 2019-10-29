import { TestBed, async, ComponentFixture } from '@angular/core/testing'
import { BrowserModule, By } from '@angular/platform-browser'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { DebugElement } from '@angular/core'

import { QuizFormComponent } from './quiz-form.component'

describe('quiz-form', () => {
    let comp: QuizFormComponent;
    let fixtrue: ComponentFixture<QuizFormComponent>;
    let de: DebugElement;
    let el: HTMLElement;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                QuizFormComponent
            ],
            imports: [
                BrowserModule,
                FormsModule,
                ReactiveFormsModule
            ]
        }).compileComponents().then(() => {
            fixtrue = TestBed.createComponent(QuizFormComponent)
            comp = fixtrue.componentInstance
            de = fixtrue.debugElement.query(By.css('form'))
            el = de.nativeElement
        })
    }))

    it('form should be invaliad', async(() => {
        comp.quizForm.controls['question'].setValue('');
        comp.quizForm.controls['possibleAnswer1'].setValue('');
        comp.quizForm.controls['possibleAnswer2'].setValue('');
        comp.quizForm.controls['possibleAnswer3'].setValue('');
        comp.quizForm.controls['possibleAnswer4'].setValue('');
        comp.quizForm.controls['correctAnswer'].setValue('');
        comp.quizForm.controls['explanation'].setValue('');
        expect(comp.quizForm.valid).toBeFalsy()

    }))
    it('form should be valiad', async(() => {
        comp.quizForm.controls['question'].setValue('a');
        comp.quizForm.controls['possibleAnswer1'].setValue('b');
        comp.quizForm.controls['possibleAnswer2'].setValue('c');
        comp.quizForm.controls['possibleAnswer3'].setValue('d');
        comp.quizForm.controls['possibleAnswer4'].setValue('e');
        comp.quizForm.controls['correctAnswer'].setValue('d');
        comp.quizForm.controls['explanation'].setValue('ff');
        expect(comp.quizForm.valid).toBeTruthy()

    }))
})