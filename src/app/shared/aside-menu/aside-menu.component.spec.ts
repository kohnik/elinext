/*import { ComponentFixture, TestBed } from '@angular/core/testing';
import {AsideMenuComponent} from "./aside-menu.component";
import {HttpClient, HttpClientModule, HttpHandler} from "@angular/common/http";
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {AuthService} from "../../core/services/authService/auth.service";
import {BookmarkDataService} from "../../core/services/bookmarkDatabaseService/bookmark-data.service";

describe('BookmarksComponent', () => {
  let component: AsideMenuComponent;
  let fixture: ComponentFixture<AsideMenuComponent>;


  const fakeAuthService: AuthService = jasmine.createSpyObj('AuthService', [
    'checkAuth']);

  const fakeBookmarkDataService: BookmarkDataService = jasmine.createSpyObj('BookmarkDataService', [
    'getImages']);
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AsideMenuComponent ],
      providers: [
        HttpTestingController,
        HttpClient,
        HttpHandler,
        {
          provide: AuthService,
          useValue: fakeAuthService,
        },
        {
          provide: BookmarkDataService,
          useValue: fakeBookmarkDataService,
        },
      ],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AsideMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});*/
