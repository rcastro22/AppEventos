import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GafetePage } from './gafete.page';

const routes: Routes = [
  {
    path: '',
    component: GafetePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GafetePageRoutingModule {}
