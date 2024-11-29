import { Component, OnInit } from '@angular/core';
import { CarritoService } from 'src/app/services/carrito/carrito.service';
import { PerfilService } from 'src/app/services/perfil/perfil.service';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';

@Component({
  selector: 'app-gafete',
  templateUrl: './gafete.page.html',
  styleUrls: ['./gafete.page.scss'],
})
export class GafetePage implements OnInit {

  constructor(
    public _up:UsuarioService,
    public _cp:CarritoService,
    public _pp:PerfilService
  ) { }

  ngOnInit() {
    this._pp.cargar_info_perfil();
    this._cp.cargar_asignados();
  }

}
