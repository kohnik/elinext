import { Component, OnInit } from '@angular/core';
import {DataForBookmarkPhoto} from "../../shared/interface";
import {of, Subscription} from "rxjs";
import {auditTime, debounceTime, delay, map, repeatWhen} from "rxjs/operators";
import {BookmarkDataService} from "../../core/services/bookmarkDatabaseService/bookmark-data.service";
import {differenceBetweenEntryAndNowTime, startOutTimeActivity} from "../../shared/constants";
import {AuthService} from "../../core/services/authService/auth.service";

@Component({
  selector: 'app-bookmarks',
  templateUrl: './bookmarks.component.html',
  styleUrls: ['./bookmarks.component.scss']
})
export class BookmarksComponent implements OnInit {
  dataForBookmarkPhoto!:DataForBookmarkPhoto[]
  subscriptionForStartActivity!: Subscription
  subscriptionForDifferenceActivity!: Subscription
  constructor(public bookmarkService: BookmarkDataService,
              public authService: AuthService) { }

  ngOnInit(): void {
    this.bookmarkService.getImages().subscribe(data=>
    {
      this.dataForBookmarkPhoto= Object.values(data)
    })
    this.subscriptionForStartActivity = startOutTimeActivity().subscribe()
    this.subscriptionForDifferenceActivity = differenceBetweenEntryAndNowTime().subscribe(()=>{
      const entryTime = new Date().getTime()
      if( entryTime - JSON.parse(<string>localStorage.getItem('entryTime')) > 50000)
      {
        this.authService.logout()
      }
    })

  }

  deleteImage(image:DataForBookmarkPhoto)
  {
    this.dataForBookmarkPhoto = this.dataForBookmarkPhoto.filter(item => item.id !== image.id)
    this.bookmarkService.deleteImage(image).subscribe(data=>console.log(data))
  }

  ngOnDestroy()
  {
    this.subscriptionForStartActivity.unsubscribe()
    this.subscriptionForDifferenceActivity.unsubscribe()
  }
}
