import {Component, HostListener, OnDestroy, OnInit} from '@angular/core';
import {EngineService} from "./core/services/engine.service";
import {PostsService} from "./core/services/posts.service";
import {fromEvent, Subscription} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'infinity-loading-angular';

  posts: number[];
  postsSubscription: Subscription;

  windowResizeSubscription: Subscription;
  windowScrollSubscription: Subscription;

  constructor(private readonly engineService: EngineService,
              private readonly postsService: PostsService) {
    this.addNewPosts(20);
  }


  ngOnInit() {

    // update posts while new posts getting add, or older posts get removed;
    this.postsSubscription = this.postsService.posts.subscribe({
      next: (posts) => {
        this.posts = posts;
      }
    });

    this.windowResizeSubscription = fromEvent(window, 'resize').subscribe({
      next: (event) => {
        this.engineService.resetScreenSize();
      }
    });


    this.windowScrollSubscription = fromEvent(window, 'scroll').subscribe({
      next: (event) => {
        this.engineService.resetScrollPosition();
      }
    })

  }

  ngOnDestroy() {
    this.postsSubscription.unsubscribe();
    this.windowResizeSubscription.unsubscribe();
    this.windowScrollSubscription.unsubscribe();
  }

  loadMorePost(event: boolean) {
    console.log('load more post triggered !');
    this.addNewPosts(6);
  }

  addNewPosts(count: number) {
    this.postsService.addPosts(count);
  }

  holdPost(postUid: number) {
    this.postsService.holdPost(postUid);
  }

  destroyPost(postUid: number) {
    this.postsService.removePost(postUid);
  }


}
