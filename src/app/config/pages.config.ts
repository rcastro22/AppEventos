import { TabsPage } from '../pages/tabs/tabs.page';
import { PerfilPage } from '../pages/perfil/perfil.page';
import { AsignadosPage } from '../pages/asignados/asignados.page';
import { CarritoPage } from '../pages/carrito/carrito.page';
import { GafetePage } from '../pages/gafete/gafete.page';
import { NetworkingPage } from '../pages/networking/networking.page';
import { TabsAsistenciaPage } from '../pages/tabs-asistencia/tabs-asistencia.page';
// import { HistorialPage } from '../pages/historial/historial';
export const PAGES = [
    { icon: 'home', image: '', title: 'HOME', component: TabsPage, show: true, url:"/tabs/tabTodos" },
    { icon: 'person', image: '', title: 'PROFILE', component: PerfilPage, show: true, url:"/perfil" },
    { icon: 'newspaper', image: '', title: 'ASSIGNED', component: AsignadosPage, show: true, url:"/tabs/tabAsignados" },
    { icon: 'cart', image: '', title: 'CART', component: CarritoPage, show: true, url:"/carrito" },
    // { icon: 'timer', image: '', title: 'Historial de pagos', component: HistorialPage, show: false },
    { icon: '', image: 'gafete.png', title: 'VIRTUAL_BADGE', component: GafetePage, show: false },
    { icon: '', image: 'lector3.png', title: 'Registro de asistencia', component: TabsAsistenciaPage, show: false },
    { icon: 'network', image: '', title: 'NETWORKING', component: NetworkingPage, show: true, url:"/networking" }
  ];
