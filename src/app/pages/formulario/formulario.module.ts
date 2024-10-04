import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FormularioPageRoutingModule } from './formulario-routing.module';

import { FormularioPage } from './formulario.page';
import { TranslateModule } from '@ngx-translate/core';
import { IonRatingComponent } from 'src/app/components/ion-rating/ion-rating.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FormularioPageRoutingModule,
    TranslateModule.forChild({extend:true})
  ],
  declarations: [FormularioPage,IonRatingComponent]
})
export class FormularioPageModule {}
