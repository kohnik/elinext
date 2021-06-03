import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {debounceTime, distinctUntilChanged, filter, switchMap} from "rxjs/operators";
import {FlickrService} from "../../core/services/flickrService/flickr.service";
import {FleckrResponse, FlickrPhotos} from "../../shared/interface";

@Component({
  selector: 'app-search-photo',
  templateUrl: './search-photos.component.html',
  styleUrls: ['./search-photos.component.scss']
})
export class SearchPhotosComponent implements OnInit {
  reactiveSearchForm: FormGroup;
  receivedPhotos!: FleckrResponse;

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
      switchMap((req) => this.photoService.getPhoto(req) ))
      .subscribe(data =>
      {
        // @ts-ignore
        this.receivedPhotos = data
        console.log(this.receivedPhotos.photos)
      })
  }
}
