import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterteacherComponent } from './registerteacher.component';

describe('RegisterteacherComponent', () => {
  let component: RegisterteacherComponent;
  let fixture: ComponentFixture<RegisterteacherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterteacherComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterteacherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
