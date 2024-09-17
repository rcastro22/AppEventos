import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TabsAsistenciaPageRoutingModule } from './tabs-asistencia-routing.module';

import { TabsAsistenciaPage } from './tabs-asistencia.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TabsAsistenciaPageRoutingModule,
    TranslateModule.forChild({extend:true}),
  ],
  declarations: [TabsAsistenciaPage]
})
export class TabsAsistenciaPageModule {}
