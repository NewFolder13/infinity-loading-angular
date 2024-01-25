import {
  AfterViewInit,
  Component,
  computed,
  ElementRef, EventEmitter,
  HostListener,
  Input, OnDestroy, OnInit,
  Output,
  Signal,
  ViewChild
} from '@angular/core';
import {EngineService} from "../../core/services/engine.service";
import {fromEvent, Subscription} from "rxjs";

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit, OnDestroy {

  private amI_inScreenView: boolean = true;

  @Input('uid') uid: number = 0;

  constructor() {
  }

  scrollEventSubscription: Subscription;

  @ViewChild('postElement') postElement: ElementRef;
  elementPosition: { x: number, y: number, width: number, height: number };

  randomHeight: number;

  ngOnInit() {

    // a random height between 100 and 400;
    this.randomHeight = Math.floor(Math.random() * (400 - 100 + 1) + 100);

    // subscribe to scroll event of window so if post wasn't in screen view and user was passed from it by scrolling down,
    // it emits that I'm not in screen so destroy me;
    this.scrollEventSubscription = fromEvent(window, 'scroll').subscribe({
      next: (event) => {
        const {x, y, width, height} = this.postElement.nativeElement.getBoundingClientRect();
        this.elementPosition = {x, y, width, height};
        if (this.amI_inScreenView) {
          if (this.elementPosition.height + this.elementPosition.y <= 0) {
            this.amI_inScreenView = false;
            this.onNotInView();
          }
        } else {
          if (this.elementPosition.height + this.elementPosition.y > 0) {
            this.amI_inScreenView = true;
            this.onIsInView();
          }
        }
      }
    });
  }

  ngOnDestroy() {
    this.scrollEventSubscription.unsubscribe();
  }

  // -------------------------------
  // hold me on screen event emitter
  // -------------------------------
  @Output('holdMe') holdMe: EventEmitter<number> = new EventEmitter<number>();

  onIsInView() {
    this.holdMe.emit(this.uid);
  }

  // -----------------------------------
  // destroy me from posts event emitter
  // -----------------------------------
  @Output('destroyMe') destroyMe: EventEmitter<number> = new EventEmitter<number>();

  onNotInView() {
    this.destroyMe.emit(this.uid);
  }

}
