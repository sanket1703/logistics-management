import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfNewSubscriptionComponent } from './prof-new-subscription.component';

describe('ProfNewSubscriptionComponent', () => {
  let component: ProfNewSubscriptionComponent;
  let fixture: ComponentFixture<ProfNewSubscriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfNewSubscriptionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfNewSubscriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
