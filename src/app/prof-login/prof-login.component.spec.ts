import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfLoginComponent } from './prof-login.component';

describe('ProfLoginComponent', () => {
  let component: ProfLoginComponent;
  let fixture: ComponentFixture<ProfLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfLoginComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
