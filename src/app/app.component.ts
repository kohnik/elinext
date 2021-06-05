import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { fromEvent, merge, Subscription} from "rxjs";
import {debounceTime, map, } from "rxjs/operators";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'elinext';
  subscription!: Subscription;
  styleForWaitingMode!: string;
  ngOnInit() {
    const scrollEvents = fromEvent(document, 'wheel',{ capture: true });
    const mousemoveEvents = fromEvent(document, 'mousemove');
    const allEvents = merge(
      scrollEvents,
      mousemoveEvents,
    );
    this.subscription = allEvents.pipe(
      map(event=>
      {
        this.styleForWaitingMode = '';
        return event
      }),
      debounceTime(10000))
      .subscribe(() => this.styleForWaitingMode = 'waitingMode');

  }
}
