import { TestBed } from '@angular/core/testing';

import { BookmarkDataService } from './bookmark-data.service';

describe('BookmarkDataService', () => {
  let service: BookmarkDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BookmarkDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
