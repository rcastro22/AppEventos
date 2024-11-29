import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ActividadesFinalizadasPageRoutingModule } from './actividades-finalizadas-routing.module';

import { ActividadesFinalizadasPage } from './actividades-finalizadas.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ActividadesFinalizadasPageRoutingModule,
    TranslateModule.forChild({extend:true}),
  ],
  declarations: [ActividadesFinalizadasPage]
})
export class ActividadesFinalizadasPageModule {}
