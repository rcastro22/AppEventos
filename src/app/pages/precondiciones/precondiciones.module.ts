import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PrecondicionesPageRoutingModule } from './precondiciones-routing.module';

import { PrecondicionesPage } from './precondiciones.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PrecondicionesPageRoutingModule,
    TranslateModule.forChild({extend:true}),
  ],
  declarations: [PrecondicionesPage]
})
export class PrecondicionesPageModule {}
