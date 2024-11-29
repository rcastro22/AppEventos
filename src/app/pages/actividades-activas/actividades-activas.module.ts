import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ActividadesActivasPageRoutingModule } from './actividades-activas-routing.module';

import { ActividadesActivasPage } from './actividades-activas.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ActividadesActivasPageRoutingModule,
    TranslateModule.forChild({extend:true}),
  ],
  declarations: [ActividadesActivasPage]
})
export class ActividadesActivasPageModule {}
