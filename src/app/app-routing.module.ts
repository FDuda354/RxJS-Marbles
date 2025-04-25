import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AppComponent} from './app.component';
import {ShareReplayComponent} from './examples/share-replay/share-replay.component';
import {GoodFetchAndFormsComponent} from './examples/good-fetch-and-forms/good-fetch-and-forms.component';
import {MainLayoutComponentComponent} from './main-layout-component/main-layout-component.component';

const routes: Routes = [
  {
    path: '', component: MainLayoutComponentComponent, children: [
      {path: 'share-replay', component: ShareReplayComponent},
      {path: 'good-forms', component: GoodFetchAndFormsComponent},
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
