import { Injectable } from '@angular/core';
import { url_services } from 'src/app/config/url.services';
import { UsuarioService } from '../usuario/usuario.service';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom, map } from 'rxjs';
import { Perfil } from 'src/app/interfaces/Login';

@Injectable({
  providedIn: 'root'
})
export class PerfilService {

  basepath = url_services;

  paises: any[] = [];
  paisescentroamerica: any[] = [];

  perfilEstudiante: any = [];
  perfilDocente: any = [];
  perfilAdministrativo: any = [];

  carneVirtualQR: string = "";

  constructor(
    private _up:UsuarioService,
    public http: HttpClient
  ) { 
    this.basepath = url_services;
  }

  async cargar_info_perfil() {
    let url = `${this.basepath}obtenerPerfil?TOKEN=${this._up.credenciales.accessToken}&TIPO=${this._up.credenciales.providerId}`;

    let datosPerfilObserver = this.http.get(url)
    .pipe(
      map(res => JSON.parse(JSON.stringify(res)))
    );

    let datosPerfil = await lastValueFrom(datosPerfilObserver).then(data => {
      let perfil = data.perfil[0]  as Perfil;
      this.paises = data.paises;
      this.paisescentroamerica = data.paisesCentroamerica;
      this.perfilAdministrativo = data.perfiladministrativo;
      this.perfilDocente = data.perfildocente;
      this.perfilEstudiante = data.perfilestudiante;
      this.carneVirtualQR = data.codigoQR;
      this._up.cargar_perfil_v2(perfil);
    });
  }

  asociar_cuentas(tipo:number, cuenta:any){}
}
