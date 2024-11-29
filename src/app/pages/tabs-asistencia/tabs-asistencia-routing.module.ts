import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsAsistenciaPage } from './tabs-asistencia.page';
import { ActividadesFinalizadasPage } from '../actividades-finalizadas/actividades-finalizadas.page';
import { ActividadesActivasPage } from '../actividades-activas/actividades-activas.page';
import { ActividadesProximasPage } from '../actividades-proximas/actividades-proximas.page';

const routes: Routes = [
  {
    path: '',
    component: TabsAsistenciaPage,
    children:[
      {
        path:'finalizadas',
        component: ActividadesFinalizadasPage
      },
      {
        path:'activas',        
        component: ActividadesActivasPage
      },
      {
        path:'proximas',        
        component: ActividadesProximasPage
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsAsistenciaPageRoutingModule {}
