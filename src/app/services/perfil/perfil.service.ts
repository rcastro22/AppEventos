import { Injectable } from '@angular/core';
import { url_services } from 'src/app/config/url.services';
import { UsuarioService } from '../usuario/usuario.service';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom, map } from 'rxjs';
import { Perfil } from 'src/app/interfaces/Login';
import { AlertController, ToastController } from '@ionic/angular';

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
    public http: HttpClient,
    private alertCtrl:AlertController,
    private toastCtrl:ToastController
  ) { 
    this.basepath = url_services;
  }

  async cargar_info_perfil() {
    let url = `${this.basepath}obtenerPerfil?TOKEN=${this._up.credenciales.accessToken}&TIPO=${this._up.credenciales.providerId}`;

    let datosPerfilObserver = this.http.get(url)
    .pipe(
      map(res => JSON.parse(JSON.stringify(res)))
    );

    await lastValueFrom(datosPerfilObserver).then(data => {
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

  async actualiza_perfil(datos: any) {
    let url = `${this.basepath}ActualizarPerfil`;

    let data = {
      TOKEN: this._up.credenciales.accessToken!,
      TIPO: this._up.credenciales.providerId!,
      NOMBRES: datos.nombres,
      APELLIDOS: datos.apellidos,
  
      DOCUMENTO: datos.documento,
      PAISDOCUMENTO: datos.paisDoc,
      TIPODOCUMENTO:
        datos.tipoDoc == 0
          ? "NULL"
          : datos.tipoDoc == 1
          ? "DPI"
          : datos.tipoDoc == 2
          ? "PASAPORTE"
          : datos.tipoDoc == 3
          ? "MENOR"
          : "NULL",
  
      NACIONALIDAD: datos.nacionalidad,
      FECHANAC: new Date(datos.nacimiento).toISOString().split("T")[0],
      TELEFONO: datos.telefono,
      COMPARTIR: datos.comparteDatos == true ? "1" : "0",
      LUGARTRABAJO: datos.lugarTrabajo,
      PUESTO: datos.puesto,
      TELEFONOTRABAJO: datos.telefonoTrabajo
    }

    let datosPerfilObserver = this.http.post(url, data)
    .pipe(
      map(resp => JSON.parse(JSON.stringify(resp)))
    );

    await lastValueFrom(datosPerfilObserver).then(async (data) => {
      let alert = this.alertCtrl.create({
            header: "Datos Actualizados!",
            subHeader: "Se han actualizado los datos con éxito",
            buttons: ["Ok"]
          });
          (await alert).present();
    });
  }

  async asociar_cuentas(tipo: number, cuenta: any) {
    let url = this.basepath;
    switch (tipo) {
      case 1:
        url = `${url}AsociarCuentaEstudiante`;
        break;
      case 2:
        url = `${url}AsociarCuentaDocente`;
        break;
      case 3:
        url = `${url}AsociarCuentaAdministrativo`;
        break;
    }

    let data = {
      TOKEN: this._up.credenciales.accessToken!,
      TIPO: this._up.credenciales.providerId!,
      FECHANAC: cuenta.fechanac,
      CARNET: tipo == 1 ? cuenta.codigo : "",
      CODPERS: tipo == 1 ? "" : cuenta.codigo
    }

    let asociarCuenta = this.http.post(url, data)
    .pipe(
      map(resp => JSON.parse(JSON.stringify(resp)))
    );

    await lastValueFrom(asociarCuenta).then(async (data) => {
      let mensaje = "";
        let tipoText =
          tipo == 1 ? "estudiante" : tipo == 2 ? "docente" : "administrativo";
        switch (data.sqlcode) {
          case 20002:
            mensaje = `La cuenta de ${tipoText} ya tiene asociado un usuario.`;
            break;
          case 20001:
            mensaje = `Los datos ingresados no coinciden con ningún ${tipoText}.`;
            break;
          case "0":
            mensaje = `Se ha relacionado su cuenta de ${tipoText} exitosamente`;
            break;
          default:
            mensaje = "Error en la asociación.";
            break;
        }

        if (data.sqlcode == 0) {
          (await this.alertCtrl.create({
              header: "Cuenta Relacionada!",
              subHeader: mensaje,
              buttons: ["Ok"]
            }))
            .present();
        } else {
          (await this.toastCtrl.create({
              message: mensaje,
              position: "middle",
              duration: 4000,
              buttons: ["Ok"]
            }))
            .present();
        }

        this.cargar_info_perfil();
    });
      
  }
}
