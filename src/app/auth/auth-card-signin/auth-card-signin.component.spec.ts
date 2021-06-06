import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthCardSigninComponent } from './auth-card-signin.component';

describe('AuthCardSigninComponent', () => {
  let component: AuthCardSigninComponent;
  let fixture: ComponentFixture<AuthCardSigninComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthCardSigninComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthCardSigninComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
