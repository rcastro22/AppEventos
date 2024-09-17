import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomePageRoutingModule } from './home-routing.module';

import { HomePage } from './home.page';
import { TranslateModule } from '@ngx-translate/core';
import { ImagenPipe } from 'src/app/pipes/imagen/imagen.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    TranslateModule.forChild({extend:true}),
    ImagenPipe,
  ],
  declarations: [HomePage]
})
export class HomePageModule {}
