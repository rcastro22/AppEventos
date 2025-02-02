import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    //redirectTo: 'folder/Inbox',
    redirectTo: 'tabs/tabTodos',
    pathMatch: 'full'
  },
  {
    path: 'tabs',
    loadChildren: () => import('./pages/tabs/tabs.module').then( m => m.TabsPageModule)
  },
  {
    path: 'evento/:evento',
    loadChildren: () => import('./pages/evento/evento.module').then(m => m.EventoPageModule)
  },
  {
    path: 'imageview/:img',
    loadChildren: () => import('./pages/modal-image/modal-image.module').then(m => m.ModalImagePageModule)
  },
  {
    path: 'perfil',
    loadChildren: () => import('./pages/perfil/perfil.module').then( m => m.PerfilPageModule),
    canActivate: [authGuard]
  },
  {
    path: 'asignados',
    loadChildren: () => import('./pages/asignados/asignados.module').then( m => m.AsignadosPageModule),
    canActivate: [authGuard]
  },
  {
    path: 'carrito',
    loadChildren: () => import('./pages/carrito/carrito.module').then( m => m.CarritoPageModule),
    canActivate: [authGuard]
  },
  {
    path: 'gafete',
    loadChildren: () => import('./pages/gafete/gafete.module').then( m => m.GafetePageModule),
    canActivate: [authGuard]
  },
  {
    path: 'networking',
    loadChildren: () => import('./pages/networking/networking.module').then( m => m.NetworkingPageModule),
    canActivate: [authGuard]
  },
  {
    path: 'tabs-asistencia',
    loadChildren: () => import('./pages/tabs-asistencia/tabs-asistencia.module').then( m => m.TabsAsistenciaPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'registro',
    loadChildren: () => import('./pages/registro/registro.module').then( m => m.RegistroPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'categorias',
    loadChildren: () => import('./pages/categorias/categorias.module').then( m => m.CategoriasPageModule)
  },
  {
    path: 'livetream',
    loadChildren: () => import('./pages/livetream/livetream.module').then( m => m.LivetreamPageModule)
  },
  /* {
    path: 'evento',
    loadChildren: () => import('./pages/evento/evento.module').then( m => m.EventoPageModule)
  }, */
  {
    path: 'modal-image',
    loadChildren: () => import('./pages/modal-image/modal-image.module').then( m => m.ModalImagePageModule)
  },
  {
    path: 'popover',
    loadChildren: () => import('./pages/popover/popover.module').then( m => m.PopoverPageModule)
  },
  {
    path: 'cuotas',
    loadChildren: () => import('./pages/cuotas/cuotas.module').then( m => m.CuotasPageModule)
  },
  {
    path: 'pago',
    loadChildren: () => import('./pages/pago/pago.module').then( m => m.PagoPageModule)
  },
  {
    path: 'formulario',
    loadChildren: () => import('./pages/formulario/formulario.module').then( m => m.FormularioPageModule)
  },
  {
    path: 'ver-orden',
    loadChildren: () => import('./pages/ver-orden/ver-orden.module').then( m => m.VerOrdenPageModule)
  },
  {
    path: 'actividades-asignacion',
    loadChildren: () => import('./pages/actividades-asignacion/actividades-asignacion.module').then( m => m.ActividadesAsignacionPageModule)
  },
  {
    path: 'precondiciones',
    loadChildren: () => import('./pages/precondiciones/precondiciones.module').then( m => m.PrecondicionesPageModule)
  },
  {
    path: 'actividades-finalizadas',
    loadChildren: () => import('./pages/actividades-finalizadas/actividades-finalizadas.module').then( m => m.ActividadesFinalizadasPageModule)
  },
  {
    path: 'actividades-activas',
    loadChildren: () => import('./pages/actividades-activas/actividades-activas.module').then( m => m.ActividadesActivasPageModule)
  },
  {
    path: 'actividades-proximas',
    loadChildren: () => import('./pages/actividades-proximas/actividades-proximas.module').then( m => m.ActividadesProximasPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
