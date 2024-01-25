import {Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {fromEvent, Subscription} from "rxjs";
import {EngineService} from "../../core/services/engine.service";

@Component({
  selector: 'app-load-more-trigger',
  templateUrl: './load-more-trigger.component.html',
  styleUrls: ['./load-more-trigger.component.scss']
})
export class LoadMoreTriggerComponent implements OnInit, OnDestroy {

  scrollEventSubscription: Subscription;

  @ViewChild('trigger') triggerEl: ElementRef;
  triggerElPos: { x: number, y: number, width: number, height: number };


  constructor(private readonly engineService: EngineService) {
  }

  ngOnInit() {
    // subscribe to scroll event of window so if post wasn't in screen view and user was passed from it by scrolling down,
    // it emits that I'm not in screen so destroy me;
    this.scrollEventSubscription = fromEvent(window, 'scroll').subscribe({
      next: (event) => {
        const {x, y, width, height} = this.triggerEl.nativeElement.getBoundingClientRect();
        this.triggerElPos = {x, y, width, height};
        if (this.triggerElPos.y + this.triggerElPos.height <= this.engineService.screen.height) {
          if (!this.isTriggeredFlag) {
            console.log('triggered !');
            this.triggerLoadMore();
          }
        }
      }
    });
  }

  ngOnDestroy() {
    this.scrollEventSubscription.unsubscribe();
  }


  @Output('triggered') trigger: EventEmitter<boolean> = new EventEmitter<boolean>();

  isTriggeredFlag: boolean = false;

  triggerLoadMore() {
    this.isTriggeredFlag = true;

    // create a timeout to make it like that data is loading xD, it just feels better to me;
    let timer = setTimeout(() => {
      this.trigger.emit(true);
      this.isTriggeredFlag = false;
      clearTimeout(timer);
    }, 3000);
  }

}
