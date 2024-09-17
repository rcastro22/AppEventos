import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';
import { HomePage } from '../home/home.page';
import { CategoriasPage } from '../categorias/categorias.page';
import { LivetreamPage } from '../livetream/livetream.page';
import { AsignadosPage } from '../asignados/asignados.page';
import { authGuard } from 'src/app/guards/auth.guard';

const routes: Routes = [
  /* {
    path: '',
    redirectTo: 'tabTodos'
  }, */
  {
    path: '',
    component: TabsPage,
    children:[
      {
        path:'tabTodos',
        //loadComponent: () => import('../home/home.page').then(m=>m.HomePage)
        //loadChildren: async () => (await import('../home/home.page')).HomePage
        component: HomePage
      },
      {
        path:'tabCategorias',        
        component: CategoriasPage
      },
      {
        path:'tabLivestream',        
        component: LivetreamPage,
        canActivate: [authGuard]
      },
      {
        path:'tabAsignados',        
        component: AsignadosPage,
        canActivate: [authGuard]
      },
    ]
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
