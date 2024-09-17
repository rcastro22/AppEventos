import { Component, OnInit } from '@angular/core';
import { CarritoService } from 'src/app/services/carrito/carrito.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  constructor(
    public _cp:CarritoService
  ) { }

  ngOnInit() {
  }

}
