import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsAsistenciaPage } from './tabs-asistencia.page';

const routes: Routes = [
  {
    path: '',
    component: TabsAsistenciaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsAsistenciaPageRoutingModule {}
