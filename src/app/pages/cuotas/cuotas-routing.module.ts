import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CuotasPage } from './cuotas.page';

const routes: Routes = [
  {
    path: '',
    component: CuotasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CuotasPageRoutingModule {}
