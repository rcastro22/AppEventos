import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NetworkingPageRoutingModule } from './networking-routing.module';

import { NetworkingPage } from './networking.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NetworkingPageRoutingModule,
    TranslateModule.forChild({extend:true}),
  ],
  declarations: [NetworkingPage]
})
export class NetworkingPageModule {}
