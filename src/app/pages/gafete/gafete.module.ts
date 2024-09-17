import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GafetePageRoutingModule } from './gafete-routing.module';

import { GafetePage } from './gafete.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GafetePageRoutingModule,
    TranslateModule.forChild({extend:true}),
  ],
  declarations: [GafetePage]
})
export class GafetePageModule {}
