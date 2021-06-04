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
  photo: PhotoTags;
}
export  interface PhotoTags
{
  id:string;
  tags: Tags
}
export  interface Tags
{
  tag:TagInfo[]
}
export  interface TagInfo
{
  author: string;
  authorname: string;
  id: string;
  machine_tag:boolean;
  raw:string;
  _content:string
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
export interface DataForBookmarkPhoto
{
  server: string,
  secret: string,
  id: string,
}
