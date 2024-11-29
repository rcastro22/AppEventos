import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ActividadesFinalizadasPage } from './actividades-finalizadas.page';

const routes: Routes = [
  {
    path: '',
    component: ActividadesFinalizadasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ActividadesFinalizadasPageRoutingModule {}
