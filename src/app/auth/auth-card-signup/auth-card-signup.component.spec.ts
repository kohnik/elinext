import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthCardSignupComponent } from './auth-card-signup.component';

describe('AuthCardSignupComponent', () => {
  let component: AuthCardSignupComponent;
  let fixture: ComponentFixture<AuthCardSignupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthCardSignupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthCardSignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
