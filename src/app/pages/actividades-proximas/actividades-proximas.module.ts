import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ActividadesProximasPageRoutingModule } from './actividades-proximas-routing.module';

import { ActividadesProximasPage } from './actividades-proximas.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ActividadesProximasPageRoutingModule,
    TranslateModule.forChild({extend:true}),
  ],
  declarations: [ActividadesProximasPage]
})
export class ActividadesProximasPageModule {}
