import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import {debounceTime, distinctUntilChanged, filter, map, switchMap} from "rxjs/operators";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {urlForFlckrReq} from "../../../shared/constants";

@Injectable({
  providedIn: 'root'
})
export class FlickrService {
  page = 1

  constructor(private http: HttpClient) {
  }

  getPhoto(req: string, page: number)
  {

    this.page+= page;
        const params = `api_key=${environment.flickr.key}&text=${req}&format=json&nojsoncallback=1&per_page=20&page=${this.page}`
        return this.http.get(urlForFlckrReq+params)
  }
}





/*return this.http.get(urlForFlckrReq+params).pipe(map((res: FlickrOutput) => {
  const urlArr = [];
  res.photos.photo.forEach((ph: FlickrPhoto) => {
    const photoObj = {
      url: `https://farm${ph.farm}.staticflickr.com/${ph.server}/${ph.id}_${ph.secret}`,
      title: ph.title
    };
    urlArr.push(photoObj);
  });
  return res;
}));*/

