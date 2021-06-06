import { Injectable } from '@angular/core';
import {DataForBookmarkPhoto} from "../../../shared/interface";
import {HttpClient} from "@angular/common/http";
import {AuthService} from "../authService/auth.service";
import {map} from "rxjs/operators";
import {urlForBookmarkDatabase} from "../../../shared/constants";

@Injectable({
  providedIn: 'root'
})
export class BookmarkDataService {

  constructor(private http: HttpClient, public authService: AuthService) {
  }

  addImage(dataForBookmarkPhotos: DataForBookmarkPhoto)
  {
    return this.http.post(`${urlForBookmarkDatabase}${this.authService.currentUserEmailForReq}.json`,dataForBookmarkPhotos)
  }
  getImages()
  {
    return this.http.get(`${urlForBookmarkDatabase}${this.authService.currentUserEmailForReq}.json`).pipe(
      map(images =>
      {
         // @ts-ignore
        Object.keys(images).map((key)=> images[key].idImageForDatabase = key)
        return images
      })
    )
  }

  deleteImage(image:DataForBookmarkPhoto)
  {
      return this.http.delete(`${urlForBookmarkDatabase}${this.authService.currentUserEmailForReq}/${image.idImageForDatabase}.json`)
  }
}
