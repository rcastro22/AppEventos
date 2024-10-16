import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ActividadesAsignacionPage } from './actividades-asignacion.page';

const routes: Routes = [
  {
    path: '',
    component: ActividadesAsignacionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ActividadesAsignacionPageRoutingModule {}
