import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { url_services, url_services_proxy } from '../../config/url.services';
import { Platform, LoadingController } from '@ionic/angular';
import { UsuarioService } from '../usuario/usuario.service';
import { catchError, map } from 'rxjs/operators';
import { of } from 'rxjs';

import { DetalleLogin } from 'src/app/interfaces/DetalleLogin';

@Injectable({
  providedIn: 'root'
})
export class EventosService {
  basepath = url_services;
  loading:any;

  eventos:any[] = [];
  evento_seleccionado:any[] = [];
  categorias:any[] = [];
  evento_detalle = {} as DetalleLogin;
  agenda:any[] = [];

  actividades_asistencia:any[] = [];
  actividades_pasadas:any[] = [];
  actividades_actuales:any[] = [];
  actividades_futuras:any[] = [];
  eventos_pasados:any[] = [];
  eventos_actuales:any[] = [];
  eventos_futuros:any[] = [];

  constructor(
    public http: HttpClient, 
    private platform:Platform,
    private _up:UsuarioService, 
    private loadingCtrl:LoadingController    
  ) { 
    /* if(this.platform.is("cordova")){
      this.basepath = url_services;
    } */
   this.basepath = url_services;
  }

  async showLoader(msg:string){
    this.loading = await this.loadingCtrl.create({
      spinner: "circles",
      message: msg
    });
    this.loading.present();
  }


  cargar_eventos(){
    let url = "";
    if(this._up.logueado){
      url = `${this.basepath}eventos?TOKEN=${this._up.credenciales.accessToken}&TIPO=${this._up.credenciales.providerId}`;
    }else{
      url = `${this.basepath}eventoslogin`;
    }

    return this.http.get(url).pipe(
      //map(resp=>resp.),
      catchError(error=>{
        if(error._body == "\"Usuario no encontrado\"" && this._up.logueado){
          //this._up.cerrar_sesion();
        }
        //return error;
        return of(error).pipe(
          map(val => error.error)
        );
      })
    );
      
  }

  cargar_detalle(evento:any){
    console.log('llego');
    this.showLoader("Cargando");
    let url = `${this.basepath}detallelogin/${evento.Evento}`;
      return this.http.get(url)
      .pipe(
        map(resp => JSON.stringify(resp))
      )
      .subscribe(data=>{
        this.loading.dismiss();
        //this.evento_detalle = data;
        this.evento_detalle = JSON.parse(data) as DetalleLogin;
        console.log(this.evento_detalle.Detalle.length);
        //console.log(this.evento_detalle);
        //console.log(data);
        this.llenarAgenda();
        console.log(this.agenda);
        
        /* this.evento_detalle["Detalle"].forEach(data => {
          if(data.Detalle.indexOf('src="https://www.youtube') !== -1) {
            let extraido1 = data.Detalle.substr(data.Detalle.indexOf('"https://www.youtube')+1, data.Detalle.length);
            data.Detalle = extraido1.substr(0, extraido1.indexOf('"'));
            data.Video = 1;
          }
        }); */
      })
  }

  llenarAgenda() {
    this.agenda = [];
    this.evento_detalle["Agenda"].forEach(data => {
      let fechabuscar = new Date(data.Fecha_Actividad).toString();
      if(!this.existe_fecha(fechabuscar))
        this.agenda.push({fecha: fechabuscar});
    });
  }

  existe_fecha(fecha:any){
    let existe=false;
    this.agenda.forEach((element,idx) => {
      if(element.fecha == fecha){
        existe = true;
      }
    });

    return existe;
  }

  buscar_evento(buscar:string){
    buscar = buscar.toUpperCase();
    let filtrado = [];
    if(buscar != ""){
      filtrado = this.eventos.filter(evento=>{
        let respuesta = false;
        respuesta = this.buscar_en_objeto(buscar,evento,respuesta);
        return respuesta;
      });
      return filtrado;
    }
    else {
      return this.eventos;
    }
  }

  buscar_en_objeto(buscar:string, objeto:any, respuesta:boolean){
    for(let elemento in objeto){
      if(Object.prototype.toString.call(objeto[elemento]) === '[object Object]'){
        respuesta = this.buscar_en_objeto(buscar,objeto[elemento],respuesta);
      }
      else{
        if(objeto[elemento] != null){
          let string;
          if(elemento == 'date'){
            string = new Date(objeto[elemento]).toString();
          }else{
            string = this.removeDiacritics(objeto[elemento].toString().toUpperCase());
          }
          //string = this.removeDiacritics(objeto[elemento].toString().toUpperCase());

          if (string.indexOf(buscar) !== -1){
            respuesta = true;
          }
        }
      }
    }
    return respuesta;
  }

  defaultDiacriticsRemovalMap = [
    { 'base': 'A', 'letters': /[\u0041\u24B6\uFF21\u00C0\u00C1\u00C2\u1EA6\u1EA4\u1EAA\u1EA8\u00C3\u0100\u0102\u1EB0\u1EAE\u1EB4\u1EB2\u0226\u01E0\u00C4\u01DE\u1EA2\u00C5\u01FA\u01CD\u0200\u0202\u1EA0\u1EAC\u1EB6\u1E00\u0104\u023A\u2C6F]/g },
    { 'base': 'E', 'letters': /[\u0045\u24BA\uFF25\u00C8\u00C9\u00CA\u1EC0\u1EBE\u1EC4\u1EC2\u1EBC\u0112\u1E14\u1E16\u0114\u0116\u00CB\u1EBA\u011A\u0204\u0206\u1EB8\u1EC6\u0228\u1E1C\u0118\u1E18\u1E1A\u0190\u018E]/g },
    { 'base': 'I', 'letters': /[\u0049\u24BE\uFF29\u00CC\u00CD\u00CE\u0128\u012A\u012C\u0130\u00CF\u1E2E\u1EC8\u01CF\u0208\u020A\u1ECA\u012E\u1E2C\u0197]/g },
    { 'base': 'O', 'letters': /[\u004F\u24C4\uFF2F\u00D2\u00D3\u00D4\u1ED2\u1ED0\u1ED6\u1ED4\u00D5\u1E4C\u022C\u1E4E\u014C\u1E50\u1E52\u014E\u022E\u0230\u00D6\u022A\u1ECE\u0150\u01D1\u020C\u020E\u01A0\u1EDC\u1EDA\u1EE0\u1EDE\u1EE2\u1ECC\u1ED8\u01EA\u01EC\u00D8\u01FE\u0186\u019F\uA74A\uA74C]/g },
    { 'base': 'U', 'letters': /[\u0055\u24CA\uFF35\u00D9\u00DA\u00DB\u0168\u1E78\u016A\u1E7A\u016C\u00DC\u01DB\u01D7\u01D5\u01D9\u1EE6\u016E\u0170\u01D3\u0214\u0216\u01AF\u1EEA\u1EE8\u1EEE\u1EEC\u1EF0\u1EE4\u1E72\u0172\u1E76\u1E74\u0244]/g },
    { 'base': 'a', 'letters': /[\u0061\u24D0\uFF41\u1E9A\u00E0\u00E1\u00E2\u1EA7\u1EA5\u1EAB\u1EA9\u00E3\u0101\u0103\u1EB1\u1EAF\u1EB5\u1EB3\u0227\u01E1\u00E4\u01DF\u1EA3\u00E5\u01FB\u01CE\u0201\u0203\u1EA1\u1EAD\u1EB7\u1E01\u0105\u2C65\u0250]/g },
    { 'base': 'e', 'letters': /[\u0065\u24D4\uFF45\u00E8\u00E9\u00EA\u1EC1\u1EBF\u1EC5\u1EC3\u1EBD\u0113\u1E15\u1E17\u0115\u0117\u00EB\u1EBB\u011B\u0205\u0207\u1EB9\u1EC7\u0229\u1E1D\u0119\u1E19\u1E1B\u0247\u025B\u01DD]/g },
    { 'base': 'i', 'letters': /[\u0069\u24D8\uFF49\u00EC\u00ED\u00EE\u0129\u012B\u012D\u00EF\u1E2F\u1EC9\u01D0\u0209\u020B\u1ECB\u012F\u1E2D\u0268\u0131]/g },
    { 'base': 'o', 'letters': /[\u006F\u24DE\uFF4F\u00F2\u00F3\u00F4\u1ED3\u1ED1\u1ED7\u1ED5\u00F5\u1E4D\u022D\u1E4F\u014D\u1E51\u1E53\u014F\u022F\u0231\u00F6\u022B\u1ECF\u0151\u01D2\u020D\u020F\u01A1\u1EDD\u1EDB\u1EE1\u1EDF\u1EE3\u1ECD\u1ED9\u01EB\u01ED\u00F8\u01FF\u0254\uA74B\uA74D\u0275]/g },
    { 'base': 'u', 'letters': /[\u0075\u24E4\uFF55\u00F9\u00FA\u00FB\u0169\u1E79\u016B\u1E7B\u016D\u00FC\u01DC\u01D8\u01D6\u01DA\u1EE7\u016F\u0171\u01D4\u0215\u0217\u01B0\u1EEB\u1EE9\u1EEF\u1EED\u1EF1\u1EE5\u1E73\u0173\u1E77\u1E75\u0289]/g },
  ];


  removeDiacritics(str:string) {
      if (str != null) {
          str = str + "";
          var changes;
          if (!changes) {
              changes = this.defaultDiacriticsRemovalMap;
          }
          for (var i = 0; i < changes.length; i++) {
              try {
                  str = str.replace(changes[i].letters, changes[i].base);
              }
              catch (err) {
                  str = "";
              }
          }
          return str;
      } else {
          return str;
      }
  }
}
