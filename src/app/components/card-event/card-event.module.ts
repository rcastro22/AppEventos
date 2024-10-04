
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { CardEventComponent } from './card-event.component';
import { TranslateModule } from '@ngx-translate/core';
import { ImagenPerfilPipe, ImagenPipe } from 'src/app/pipes/imagen/imagen.pipe';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [
      CommonModule,
      IonicModule,
      TranslateModule.forChild({extend:true}),
      RouterModule.forChild([{path:'',component:CardEventComponent}]),
      ImagenPipe, ImagenPerfilPipe
    ],
  declarations: [CardEventComponent],
  exports: [CardEventComponent]
})

export class CardEventModule { }
