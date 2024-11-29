import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ActividadesProximasPage } from './actividades-proximas.page';

const routes: Routes = [
  {
    path: '',
    component: ActividadesProximasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ActividadesProximasPageRoutingModule {}
