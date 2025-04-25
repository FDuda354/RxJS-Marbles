import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {provideHttpClient, withInterceptorsFromDi} from '@angular/common/http';
import {ReactiveFormsModule} from "@angular/forms";
import { ShareReplayComponent } from './examples/share-replay/share-replay.component';
import { GoodFetchAndFormsComponent } from './examples/good-fetch-and-forms/good-fetch-and-forms.component';
import { MainLayoutComponentComponent } from './main-layout-component/main-layout-component.component';

@NgModule({
  declarations: [
    AppComponent,
    ShareReplayComponent,
    GoodFetchAndFormsComponent,
    MainLayoutComponentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [
    provideHttpClient(withInterceptorsFromDi()),
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
