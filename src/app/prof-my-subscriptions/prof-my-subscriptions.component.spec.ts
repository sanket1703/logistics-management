import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfMySubscriptionsComponent } from './prof-my-subscriptions.component';

describe('ProfMySubscriptionsComponent', () => {
  let component: ProfMySubscriptionsComponent;
  let fixture: ComponentFixture<ProfMySubscriptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfMySubscriptionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfMySubscriptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
