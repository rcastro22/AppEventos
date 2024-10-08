import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CuotasPageRoutingModule } from './cuotas-routing.module';

import { CuotasPage } from './cuotas.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CuotasPageRoutingModule,
    TranslateModule.forChild({extend:true}),
  ],
  declarations: [CuotasPage]
})
export class CuotasPageModule {}
