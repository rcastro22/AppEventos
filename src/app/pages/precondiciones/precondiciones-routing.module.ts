import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PrecondicionesPage } from './precondiciones.page';

const routes: Routes = [
  {
    path: '',
    component: PrecondicionesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PrecondicionesPageRoutingModule {}
