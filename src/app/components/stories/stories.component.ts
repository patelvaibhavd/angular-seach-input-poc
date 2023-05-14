import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { StoriesService } from 'src/app/core/services/stories.service';
import { fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, tap } from 'rxjs/operators';

@Component({
  selector: 'app-stories',
  templateUrl: './stories.component.html',
  styleUrls: ['./stories.component.scss']
})
export class StoriesComponent implements OnInit, AfterViewInit {

  @ViewChild('searchInput') searchInput: ElementRef;
  stories = [];
  isLoader: boolean = true;

  constructor(
    private _storiesService: StoriesService
  ) { }

  ngOnInit(): void {
    this.getStories('');
  }

  ngAfterViewInit() {
    // server-side search
    fromEvent(this.searchInput.nativeElement, 'keyup')
      .pipe(
        filter(Boolean),
        debounceTime(500),
        distinctUntilChanged(),
        tap((text) => {
          this.getStories(this.searchInput.nativeElement.value)
        })
      )
      .subscribe();
  }

  getStories(searchText) {
    this.isLoader = true;
    this._storiesService.getStories(searchText).subscribe((res) => {
      this.isLoader = false;
      if (res && res.hits && res.hits.length) {
        this.stories = res.hits;
      }
    }, (error) => {
      this.isLoader = false;
    })
  }

}
