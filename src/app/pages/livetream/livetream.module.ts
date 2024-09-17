import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LivetreamPageRoutingModule } from './livetream-routing.module';

import { LivetreamPage } from './livetream.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LivetreamPageRoutingModule,
    TranslateModule.forChild({extend:true}),
  ],
  declarations: [LivetreamPage]
})
export class LivetreamPageModule {}
