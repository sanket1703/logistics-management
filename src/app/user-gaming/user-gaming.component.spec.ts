import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserGamingComponent } from './user-gaming.component';

describe('UserGamingComponent', () => {
  let component: UserGamingComponent;
  let fixture: ComponentFixture<UserGamingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserGamingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserGamingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
