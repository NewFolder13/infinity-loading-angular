import {Injectable, signal, Signal, WritableSignal} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EngineService {

  constructor() {
  }

  private _screen: WritableSignal<{ width: number, height: number }> = signal({
    width: window.innerWidth,
    height: window.innerHeight
  });
  public get screen(): { width: number, height: number } {
    return this._screen();
  }

  private _scroll: WritableSignal<{ top: number }> = signal({top: 0});
  public get scroll(): { top: number } {
    return this._scroll();
  }


  resetScreenSize() {
    this._screen.set({width: window.innerWidth, height: window.innerHeight});
  }


  resetScrollPosition() {
    this._scroll.set({top: document.documentElement.scrollTop});
  }


}
