import {fromEvent, merge, Subscription, timer} from "rxjs";
import {auditTime, map} from "rxjs/operators";

export const urlForFlckrSearchPhoto =  `https://www.flickr.com/services/rest/?method=flickr.photos.search&`
export const urlForFlckrGetTagsListPhoto =  `https://www.flickr.com/services/rest/?method=flickr.tags.getListPhoto&`
export const patternForEmail = /[a-zA-Z_]+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}/;
export const patternForPassword = /[0-9a-zA-Z]{6,}/;
export const urlForBookmarkDatabase = 'https://elinext-cd314-default-rtdb.firebaseio.com/bookmarks/'


export const startOutTimeActivity = () =>{
  const scrollEvents = fromEvent(document, 'wheel',{ capture: true });
  const mousemoveEvents = fromEvent(document, 'mousemove');
  const allEvents = merge(
    scrollEvents,
    mousemoveEvents,
  );
  return allEvents.pipe(
    map(item=>{
      const entryTime = new Date().getTime()
      localStorage.setItem('entryTime',`${entryTime}`)
      return item
    }))

}

export const differenceBetweenEntryAndNowTime = () => {
        return timer(0,5000).pipe(auditTime(5000))
}


