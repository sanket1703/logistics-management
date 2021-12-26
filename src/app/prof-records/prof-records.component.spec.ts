import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfRecordsComponent } from './prof-records.component';

describe('ProfRecordsComponent', () => {
  let component: ProfRecordsComponent;
  let fixture: ComponentFixture<ProfRecordsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfRecordsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfRecordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
