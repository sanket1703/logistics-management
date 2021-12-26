import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameRecordsComponent } from './game-records.component';

describe('GameRecordsComponent', () => {
  let component: GameRecordsComponent;
  let fixture: ComponentFixture<GameRecordsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GameRecordsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameRecordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
