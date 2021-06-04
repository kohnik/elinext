import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {filter} from "rxjs/operators";

@Component({
  selector: 'app-aside-menu',
  templateUrl: './aside-menu.component.html',
  styleUrls: ['./aside-menu.component.scss']
})
export class AsideMenuComponent implements OnInit {
  currentRoute!: any;
  styleForAsideButton!: string

  constructor(private router: Router,
              public route: ActivatedRoute) {
    this.router.events.pipe(filter((event)=> event instanceof NavigationEnd)).subscribe((data)=>{
      this.currentRoute = data
      this.styleForAsideButton = this.currentRoute.url === '/bookmark' ? 'SavedPhoto' : 'Search';
    })

  }

  ngOnInit(): void {

  }

}
