import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, of, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  protected _posts: BehaviorSubject<number[]> = new BehaviorSubject<number[]>([]);
  get posts(): Observable<number[]> {
    return this._posts.asObservable();
  }

  protected _postsTimeoutsDB: any[] = [];


  /*
    this section only send new array of posts to observable, so subscribers won't run for each post added to array of _posts,
    instead it only send all new posts once the add new posts triggered;
  */
  addPosts(howMuchPosts: number = 3) {
    // find the exact number (uid) for only one next post
    const exactNextPostNumber = (this._posts.getValue()[this._posts.getValue().length - 1] || 0) + 1;
    const nextPostsNumbers = [];
    // we do a loop to get all post's UID before we send new data to observable;
    for (let i = 0; i < howMuchPosts; i++) {
      nextPostsNumbers.push(exactNextPostNumber + i);
    }
    // new array of all posts with new generated one will send to observable, so subscribers see the whole new array;
    this._posts.next([...this._posts.getValue(), ...nextPostsNumbers]);
    console.log(`new posts with UID ${nextPostsNumbers} has been added to posts !`);
  }


  holdPost(postUid: number) {
    if (this._postsTimeoutsDB[postUid]) {
      clearTimeout(this._postsTimeoutsDB[postUid]);
      console.log(`Post with UID ${postUid} deletion timer has been stopped !`);
    }
  }


  removePost(postUid: number) {
    this._postsTimeoutsDB[postUid] = setTimeout(() => {
      this._posts.next(this._posts.getValue().filter(post => post !== postUid));
      console.log(`Post with UID ${postUid} has been deleted !`);
      clearTimeout(this._postsTimeoutsDB[postUid]);
    }, 3000);
  }


}
