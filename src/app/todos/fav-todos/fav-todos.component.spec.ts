import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavTodosComponent } from './fav-todos.component';

describe('FavTodosComponent', () => {
  let component: FavTodosComponent;
  let fixture: ComponentFixture<FavTodosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FavTodosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FavTodosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
