import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LivetreamPage } from './livetream.page';

const routes: Routes = [
  {
    path: '',
    component: LivetreamPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LivetreamPageRoutingModule {}
