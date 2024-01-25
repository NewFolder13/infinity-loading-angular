import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PostComponent } from './components/post/post.component';
import { LoadMoreTriggerComponent } from './components/load-more-trigger/load-more-trigger.component';

@NgModule({
  declarations: [
    AppComponent,
    PostComponent,
    LoadMoreTriggerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
