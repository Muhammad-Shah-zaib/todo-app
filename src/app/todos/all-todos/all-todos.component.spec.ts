import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AllTodosComponent } from './all-todos.component';

describe('AllTodosComponent', () => {
  let component: AllTodosComponent;
  let fixture: ComponentFixture<AllTodosComponent>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AllTodosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
