import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ActividadesActivasPage } from './actividades-activas.page';

const routes: Routes = [
  {
    path: '',
    component: ActividadesActivasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ActividadesActivasPageRoutingModule {}
