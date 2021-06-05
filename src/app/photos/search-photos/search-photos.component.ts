import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {debounceTime, distinctUntilChanged, filter, switchMap} from "rxjs/operators";
import {FlickrService} from "../../core/services/flickrService/flickr.service";
import {DataForBookmarkPhoto, FleckrResponse, FlickrPhoto, FlickrPhotos} from "../../shared/interface";

@Component({
  selector: 'app-search-photo',
  templateUrl: './search-photos.component.html',
  styleUrls: ['./search-photos.component.scss']
})
export class SearchPhotosComponent implements OnInit {
  reactiveSearchForm: FormGroup;
  responceFlickr!: FlickrPhotos
  receivedPhotos!: FlickrPhoto[];
    okey = false
  constructor(private formBuilder: FormBuilder,
              public photoService: FlickrService) {
    this.reactiveSearchForm = this.formBuilder.group({
      inputSearch: new FormControl('')
    })

  }

  ngOnInit(): void {
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
    console.log(1)
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
    let dataForBookmarkPhotos:DataForBookmarkPhoto[];
    if(localStorage.getItem('bookmarks'))
    {
      dataForBookmarkPhotos =[{
        server: photo.server,
        secret: photo.secret,
        id: photo.id
      },...JSON.parse((localStorage.getItem('bookmarks') as string))]
      localStorage.setItem('bookmarks',`${JSON.stringify(dataForBookmarkPhotos)}`)
    }
    else {
      dataForBookmarkPhotos =[{
        server: photo.server,
        secret: photo.secret,
        id: photo.id
      }]
      localStorage.setItem('bookmarks',`${JSON.stringify(dataForBookmarkPhotos)}`)
    }
  }

  dosomething()
  {
    var i = 0;
    i+=1;
    this.okey = i === 20
  }
}
