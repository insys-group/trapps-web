import { InterviewComponent } from './interview.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

describe('InterviewComponent', () => {
  let component: InterviewComponent;
  let fixture: ComponentFixture<InterviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InterviewComponent ]
    }).compileComponents();
  }));

  beforeEach(() => {

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  })
});
