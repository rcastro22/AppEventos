import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VerOrdenPage } from './ver-orden.page';

const routes: Routes = [
  {
    path: '',
    component: VerOrdenPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VerOrdenPageRoutingModule {}
