import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EventoPageRoutingModule } from './evento-routing.module';

import { EventoPage } from './evento.page';
import { TranslateModule } from '@ngx-translate/core';
import { ImagenPerfilPipe, ImagenPipe } from 'src/app/pipes/imagen/imagen.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EventoPageRoutingModule,
    TranslateModule.forChild({extend:true}),
    ImagenPipe, ImagenPerfilPipe,
  ],
  declarations: [EventoPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class EventoPageModule {}
