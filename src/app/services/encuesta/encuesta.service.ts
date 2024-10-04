import { Injectable } from '@angular/core';
import { UsuarioService } from '../usuario/usuario.service';
import { HttpClient } from '@angular/common/http';
import { url_services, url_services_proxy } from 'src/app/config/url.services';
import { catchError, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EncuestaService {

  basepath = url_services_proxy;
  encuesta:any = [];

  constructor(
    private _up:UsuarioService,
    public http:HttpClient,
  ) {
    this.basepath = url_services;
  }

  obtener_encuesta(evento_id:any){
    let url = `${this.basepath}obtenerFormularios?TOKEN=${this._up.credenciales.accessToken}&TIPO=${this._up.credenciales.providerId}&EVENTO=${evento_id}`;

    return this.http.get(url)
    .pipe(
      map(resp => JSON.parse(JSON.stringify(resp))),
      catchError(error=>{
        /* if(error._body == "\"Usuario no encontrado\"" && this._up.logueado){
          this._up.cerrar_sesion();
        } */
        return error;
      })
    );
  }

  responder_encuesta(preguntas:any,respuestas:any,encuesta:string,portal:string){
    let url = `${this.basepath}ResponderEncuesta`;

    let params = new URLSearchParams();
    params.append("TOKEN",this._up.credenciales.accessToken!);
    params.append("TIPO",this._up.credenciales.providerId!);
    params.append("PPREGUNTAS",preguntas);
    params.append("PRESPUESTAS",respuestas);
    params.append("PENCUESTA",encuesta);
    params.append("PPORTAL",portal);

    return this.http.post(url,params)
    .pipe(
      map(resp => JSON.parse(JSON.stringify(resp))),
      catchError(error=>{
        /* if(error._body == "\"Usuario no encontrado\"" && this._up.logueado){
          this._up.cerrar_sesion();
        } */
        return of(error);
      })
    )

  }

}
