import { Component, OnInit } from '@angular/core';
import { DataForBookmarkPhoto } from '../../shared/interface';
import { of, Subscription } from 'rxjs';
import {
  auditTime,
  debounceTime,
  delay,
  map,
  repeatWhen,
} from 'rxjs/operators';
import { BookmarkDataService } from '../../core/services/bookmarkDatabaseService/bookmark-data.service';
import {
  differenceBetweenEntryAndNowTime,
  startOutTimeActivity,
} from '../../shared/constants';
import { AuthService } from '../../core/services/authService/auth.service';

@Component({
  selector: 'app-bookmarks',
  templateUrl: './bookmarks.component.html',
  styleUrls: ['./bookmarks.component.scss'],
})
export class BookmarksComponent implements OnInit {
  dataForBookmarkImages!: DataForBookmarkPhoto[];

  timeLastActivity = new Date().getTime();

  constructor(
    public bookmarkService: BookmarkDataService,
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    this.bookmarkService.getImages().subscribe((data) => {
      this.dataForBookmarkImages = Object.values(data);
    });
  }

  deleteImage(image: DataForBookmarkPhoto) {
    this.dataForBookmarkImages = this.dataForBookmarkImages.filter(
      (item) => item.id !== image.id
    );
    this.bookmarkService
      .deleteImage(image)
      .subscribe((data) => console.log(data));
  }


}
