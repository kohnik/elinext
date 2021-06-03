import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SearchPhotosComponent} from "./photos/search-photos/search-photos.component";
import {BookmarksComponent} from "./photos/bookmarks/bookmarks.component";

const routes: Routes = [
  { path: '', component: SearchPhotosComponent },
  { path: 'bookmark', component: BookmarksComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
