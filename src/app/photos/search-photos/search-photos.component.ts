import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {debounceTime, distinctUntilChanged, filter, switchMap} from "rxjs/operators";
import {FlickrService} from "../../core/services/flickrService/flickr.service";
import {DataForBookmarkPhoto, FlickrPhoto, FlickrPhotos} from "../../shared/interface";
import {BookmarkDataService} from "../../core/services/bookmarkDatabaseService/bookmark-data.service";
import {AuthService} from "../../core/services/authService/auth.service";
import {Subscription} from "rxjs";
import {differenceBetweenEntryAndNowTime, startOutTimeActivity} from "../../shared/constants";

@Component({
  selector: 'app-search-photo',
  templateUrl: './search-photos.component.html',
  styleUrls: ['./search-photos.component.scss']
})
export class SearchPhotosComponent implements OnInit {
  reactiveSearchForm: FormGroup;
  responceFlickr!: FlickrPhotos
  receivedPhotos!: FlickrPhoto[];
  toDispalyImageStyle!:string
  countForLoadImage = 0
  subscriptionForStartActivity!: Subscription
  subscriptionForDifferenceActivity!: Subscription
  constructor(private formBuilder: FormBuilder,
              public photoService: FlickrService,
              public  bookmarkService: BookmarkDataService,
              public authService: AuthService) {
    this.reactiveSearchForm = this.formBuilder.group({
      inputSearch: new FormControl('')
    })

  }
  ngOnInit(): void {
    this.subscriptionForStartActivity = startOutTimeActivity().subscribe()
    this.subscriptionForDifferenceActivity = differenceBetweenEntryAndNowTime().subscribe(()=>{
      const entryTime = new Date().getTime()
      if( entryTime - JSON.parse(<string>localStorage.getItem('entryTime')) > 20000)
      {
        this.authService.logout()
      }
    })


    this.reactiveSearchForm.get('inputSearch')?.valueChanges.pipe(
      filter(req => req.length > 1),
      distinctUntilChanged(),
      debounceTime(500),
      switchMap((req) => this.photoService.getPhoto(req,1) ))
      .subscribe(data =>
      {
        console.log(data)
        this.responceFlickr = data.photos;

        this.receivedPhotos = data.photos.photo
      })
  }



  onScroll() {

    this.photoService.getPhoto(this.reactiveSearchForm.value.inputSearch,1)
      .subscribe(data =>
      {
        console.log(data)
        this.responceFlickr = data.photos;
        this.receivedPhotos= this.receivedPhotos.concat(data.photos.photo)

      })
  }
  addToBookmark(photo: FlickrPhoto)
  {
    let dataForBookmarkPhotos:DataForBookmarkPhoto;
    dataForBookmarkPhotos ={
      server: photo.server,
      secret: photo.secret,
      id: photo.id,
      email: this.authService.currentUserEmailForReq,
      idImageForDatabase: ''
    }
    this.bookmarkService.addImage(dataForBookmarkPhotos).subscribe()

  }

  toLoadImage()
  {
    this.countForLoadImage++;
    if(this.countForLoadImage === 20)
    {
      this.toDispalyImageStyle = 'visible'
      this.countForLoadImage = 0
    }
  }

  ngOnDestroy()
  {
    this.subscriptionForStartActivity.unsubscribe()
    this.subscriptionForDifferenceActivity.unsubscribe()
  }
}
