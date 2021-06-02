import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MaterialModule} from './core/material/material.module';
import { AsideMenuComponent } from './shared/aside-menu/aside-menu.component';
import { SearchPhotosComponent } from './photos/search-photos/search-photos.component';
import { BookmarksComponent } from './photos/bookmarks/bookmarks.component'
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AsideMenuComponent,
    SearchPhotosComponent,
    BookmarksComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
