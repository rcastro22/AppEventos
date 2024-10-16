import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CarritoService } from 'src/app/services/carrito/carrito.service';

@Component({
  selector: 'app-precondiciones',
  templateUrl: './precondiciones.page.html',
  styleUrls: ['./precondiciones.page.scss'],
})
export class PrecondicionesPage implements OnInit {

  constructor(
    public _cp:CarritoService,
    public modalCtrl:ModalController
  ) { }

  ngOnInit() {
  }

}
