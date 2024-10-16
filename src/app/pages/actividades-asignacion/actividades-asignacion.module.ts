import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ActividadesAsignacionPageRoutingModule } from './actividades-asignacion-routing.module';

import { ActividadesAsignacionPage } from './actividades-asignacion.page';
import { TranslateModule } from '@ngx-translate/core';
import { ImagenSvgPipe } from 'src/app/pipes/imagen/imagen.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ActividadesAsignacionPageRoutingModule,
    TranslateModule.forChild({extend:true}),
    ImagenSvgPipe
  ],
  declarations: [ActividadesAsignacionPage]
})
export class ActividadesAsignacionPageModule {}
