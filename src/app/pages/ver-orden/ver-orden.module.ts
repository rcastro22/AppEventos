import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VerOrdenPageRoutingModule } from './ver-orden-routing.module';

import { VerOrdenPage } from './ver-orden.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VerOrdenPageRoutingModule
  ],
  declarations: [VerOrdenPage]
})
export class VerOrdenPageModule {}
