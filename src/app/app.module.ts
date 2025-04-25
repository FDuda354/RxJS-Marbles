import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {provideHttpClient, withInterceptorsFromDi} from '@angular/common/http';
import {ReactiveFormsModule} from "@angular/forms";
import { ShareReplayComponent } from './examples/share-replay/share-replay.component';
import { GoodFetchAndFormsComponent } from './examples/good-fetch-and-forms/good-fetch-and-forms.component';
import { MainLayoutComponentComponent } from './main-layout-component/main-layout-component.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeng/themes/aura';
import {ProgressSpinner} from 'primeng/progressspinner';
import {TableModule} from 'primeng/table';

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
    ReactiveFormsModule,
    ProgressSpinner,
    TableModule
  ],
  providers: [
    provideHttpClient(withInterceptorsFromDi()),
    provideAnimationsAsync(),
    providePrimeNG({
      theme: {
        preset: Aura,
        options: {
          darkModeSelector: false
        }
      },
      translation: {
        firstDayOfWeek: 1,
        dayNames: ["Niedziela", "Poniedziałek", "Wtorek", "Środa", "Czwartek", "Piątek", "Sobota"],
        dayNamesShort: ["Nie", "Pon", "Wto", "Śro", "Czw", "Pią", "Sob"],
        dayNamesMin: ["Nie", "Pon", "Wt", "Śr", "Czw", "Pt", "Sob"],
        monthNames: [
          "Styczeń", "Luty", "Marzec", "Kwiecień", "Maj", "Czerwiec",
          "Lipiec", "Sierpień", "Wrzesień", "Październik", "Listopad", "Grudzień"
        ],
        monthNamesShort: [
          "Sty", "Lut", "Mar", "Kwi", "Maj", "Cze",
          "Lip", "Sie", "Wrz", "Paź", "Lis", "Gru"
        ],
        today: 'Dzisiaj',
        clear: 'Wyczyść',
        dateFormat: 'dd.mm.yy',
        weekHeader: 'Tydz'
      }
    })
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
