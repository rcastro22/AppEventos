import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VerOrdenPageRoutingModule } from './ver-orden-routing.module';

import { VerOrdenPage } from './ver-orden.page';
import { PdfViewerModule } from 'ng2-pdf-viewer';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VerOrdenPageRoutingModule,
    PdfViewerModule
  ],
  declarations: [VerOrdenPage]
})
export class VerOrdenPageModule {}
