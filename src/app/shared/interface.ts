export interface FlickrPhoto {
  farm: string;
  id: string;
  isfamily:number;
  isfriend:number;
  ispublic:number;
  owner: string;
  secret: string;
  server: string;
  title: string;
}
export interface FlickrPhotos {
  page: number;
  pages: number;
  perpage: 20;
  photo: FlickrPhoto[];
  total: number;

}
export interface FleckrResponse
{
  photos: FlickrPhotos
  stat:string;
}
