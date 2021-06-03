import { Component, OnInit } from '@angular/core';
import {DataForBookmarkPhoto} from "../../shared/interface";

@Component({
  selector: 'app-bookmarks',
  templateUrl: './bookmarks.component.html',
  styleUrls: ['./bookmarks.component.scss']
})
export class BookmarksComponent implements OnInit {
  dataForBookmarkPhoto!:DataForBookmarkPhoto[]
  constructor() { }

  ngOnInit(): void {

    this.dataForBookmarkPhoto = JSON.parse(localStorage.getItem('bookmarks') as string)
    console.log(  this.dataForBookmarkPhoto)
  }
}
