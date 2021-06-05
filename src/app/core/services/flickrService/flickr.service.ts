import { Injectable } from '@angular/core';
import { map, switchMap} from "rxjs/operators";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {urlForFlckrGetTagsListPhoto, urlForFlckrSearchPhoto} from "../../../shared/constants";
import {FleckrResponse, FlickrPhoto, FlickrPhotos, PhotoTags, TagsResponce} from "../../../shared/interface";
import {forkJoin, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class FlickrService {
  page = 0
  constructor(private http: HttpClient) {}

  getPhoto(req: string, page: number): Observable<FleckrResponse>
  {

    this.page += page;
    console.log(  this.page)
    const paramsForImageReq = `api_key=${environment.flickr.key}&text=${req}&format=json&nojsoncallback=1&per_page=20&page=${this.page}`
    return this.http.get(urlForFlckrSearchPhoto+paramsForImageReq).pipe(
      // @ts-ignore
    switchMap( (firstReq:FleckrResponse)=>
    {
      return this.getTags(firstReq)
    }))
  }

  getTags(firstReq:FleckrResponse): Observable<FleckrResponse>
  {
    let arrayWithLinksForTagsReq;
    arrayWithLinksForTagsReq = firstReq.photos.photo.map((itemPhoto:FlickrPhoto) =>
    {
      let paramsForTagReq = `api_key=${environment.flickr.key}&photo_id=${itemPhoto.id}&format=json&nojsoncallback=1`
      return this.http.get(urlForFlckrGetTagsListPhoto+paramsForTagReq)
    })
    // @ts-ignore
    return forkJoin(arrayWithLinksForTagsReq).pipe(map((tag: TagsResponce[])=>
    {
      firstReq.photos.photo = firstReq.photos.photo.map((itemPhoto:FlickrPhoto, index) =>{
        return {...itemPhoto,...tag[index].photo.tags}
      })
      return  firstReq
    }))
  }
}


