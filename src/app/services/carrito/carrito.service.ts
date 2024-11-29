import { Injectable } from '@angular/core';

// Moduls
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { UsuarioService } from '../usuario/usuario.service';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, lastValueFrom, map, of } from 'rxjs';

import { url_services } from "../../config/url.services";
import { CarritoRoot } from 'src/app/interfaces/Carrito';
import { AlertController, NavController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  basepath = url_services;

  precondiciones:any[] = [];

  // Carritos
  items:any[] = [];
  pendiente_pago:any[] = [];
  ordenes_vencidas:any[] = [];
  cuotas_pendientes:any[] = [];

  total_carrito:number = 0;

  // Asignados
  asignados:any[] = [];
  encuestas_asig:any[] = [];
  formularios_asig:any[] = [];

  // Cuotas
  detalle_cuotas:any[] = [];
  eventoIdCuotas:string = "";
  cantcuotas:number = 0;
  cuotaspagar:number = 0;
  montocuotas:number = 0;

  // Detalle de pago
  nit:string = "";
  nombre:string = "";
  correo:string = "";
  
  transmisiones:number = 0;
  
  constructor(
    public translateService:TranslateService,
    public http:HttpClient,
    private _up:UsuarioService,
    private navCtrl:NavController,
    private alertCtrl:AlertController,
    private toastCtrl:ToastController
  ) { }

  async translateSer(value:string,parm?:any) {
    let valueTranslate = "";
    //this.translateService.use('en');
    await this.translateService.get(value,parm).toPromise().then(resp => { valueTranslate = resp; })
    return valueTranslate;
  }

  ver_carrito(){
    this.navCtrl.navigateRoot("carrito");
  }

  cargar_carrito(){
    let carrito:string = "";
    let continuar = true;
    for (let index = 1; index < 5; index++) {
      switch (index) {
        case 1:carrito="Carrito";break;
        case 2:carrito="ordenesPendientesPago";break;
        case 3:carrito="ordenesVencidas";break;
        case 4:carrito="cuotasPendientes";break;
      }
      let url = `${this.basepath}${carrito}?TOKEN=${this._up.credenciales.accessToken}&TIPO=${this._up.credenciales.providerId}`;
      
      this.http.get(url)
      .pipe(
        map(res => JSON.parse(JSON.stringify(res)))
      )
      .subscribe((data)=>{
        let carrito = data;
          switch (index) {
            case 1:this.items = carrito.Carrito;this.calcular_total();break;
            case 2:this.pendiente_pago = carrito;break;
            case 3:this.ordenes_vencidas = carrito;break;
            case 4:this.cuotas_pendientes = carrito;break;
          }
      },
      err => {
        console.log(err._body);
        if(continuar && err._body == "\"Usuario no encontrado\"" && this._up.logueado){
          this._up.cerrar_sesion();
        }
        continuar = false;
      });

      if(!continuar) break;
    }
  }

  calcular_total(){
    this.total_carrito = 0;

    for(let item of this.items){
      this.total_carrito += Number(item.Total);
    }
  }


  agregar_carrito(evento:any){
    //let url = `${this.basepath}AgregarCarrito?TOKEN=${this._up.credenciales.accessToken}&TIPO=${this._up.credenciales.providerId}&EVENTO=${evento.Evento}`;
    let url = `${this.basepath}AgregarCarrito`;

    /* let data = new URLSearchParams();
    data.append("TOKEN", this._up.credenciales.accessToken!);
    data.append("TIPO", this._up.credenciales.providerId!);
    data.append("EVENTO",evento.Evento); */

    let data = {
      TOKEN: this._up.credenciales.accessToken!,
      TIPO: this._up.credenciales.providerId!,
      EVENTO: evento.Evento
    };

    return this.http.post(url,data)
    .pipe(
      map(res => JSON.parse(JSON.stringify(res))),
      catchError(err => {
        console.log(err);
        if(err.status == 400) {
          this.precondiciones = [];
          try{
            let prec = JSON.parse(err.error);
            prec.Precondiciones.forEach((element:any) => {
              this.precondiciones.push({'Precondiciones':[{'Descripcion':element.Descripcion,'Cumple':element.Cumple}]});
            });
          } catch (error) {
            this.precondiciones.push({'Precondiciones':[{'Descripcion':err.error,'Cumple':false}]});
          }
          console.log(this.precondiciones);
          return of({'carrito':null,'Error':err.error});
        }
        else {
          return of({'carrito':null});
        }
      }),
    )

  }

  eliminar_carrito(evento:any,tipoCarrito:number){

    //let url = `${this.basepath}QuitarDeCarrito?TOKEN=${this._up.credenciales.accessToken}&TIPO=${this._up.credenciales.providerId}&EVENTO=${evento.Evento}`;
    let url = `${this.basepath}QuitarDeCarrito`;

    let data = {
      TOKEN: this._up.credenciales.accessToken!,
      TIPO: this._up.credenciales.providerId!,
      EVENTO: evento.Evento
    };
    /* let data = new URLSearchParams();
    data.append("TOKEN", this._up.credenciales.accessToken!);
    data.append("TIPO", this._up.credenciales.providerId!);
    data.append("EVENTO", evento.Evento); */

    return this.http.post(url,data)
    .pipe(
      map(res => JSON.parse(JSON.stringify(res)))
    );
  }

  aplicar_descuento(evento:string, descuento:string){
    let url = `${this.basepath}AplicarDescuento?TOKEN=${this._up.credenciales.accessToken}&TIPO=${this._up.credenciales.providerId}&EVENTO=${evento}&CODIGO=${descuento}`;

    let params = {};

    this.http.post(url,params)
    .pipe(
      map(resp => JSON.parse(JSON.stringify(resp))),
      catchError(error=>{
        /* if(error._body == "\"Usuario no encontrado\"" && this._up.logueado){
          this._up.cerrar_sesion();
        } */
        return error;
      })

    )
    .subscribe(async data=>{
      let mensaje = "";
      switch (data.sqlcode) {
        case "-20002":mensaje = `Código de descuento no válido!.`; break;
        case "0":mensaje = `Código de descuento aplicado! descuento:  ${data.Descripción}`; break;
        default:mensaje = "Error en la asociación."; break;
      }
      if(data.sqlcode == 0){
        (await this.alertCtrl.create({
          header: "Descuento en evento!",
          message: mensaje,
          buttons: ["Ok"]
        })).present();
      }else{
        (await this.toastCtrl.create({
          message: mensaje,
          position: 'bottom',
          color: 'danger',
          duration: 4000,
          buttons: ["Ok"]
        })).present();
      }
      this.cargar_carrito();
    })
  }

  cargar_cuotas(evento_id:any){
    let url = `${this.basepath}infoCuotas?TOKEN=${this._up.credenciales.accessToken}&TIPO=${this._up.credenciales.providerId}&EVENTO=${evento_id}`;

    return this.http.get(url)
    .pipe(
      map(resp => JSON.parse(JSON.stringify(resp))),
      catchError(error=>{
        /* if(error._body == "\"Usuario no encontrado\"" && this._up.logueado){
          this._up.cerrar_sesion();
        } */
        return error;
      })
      
    )
  }

  generar_orden_pago(){
    /* let url = `${this.basepath}GenerarOrden?TOKEN=${this._up.credenciales.accessToken!}
&TIPO=${this._up.credenciales.providerId!}
&EVENTO=${this.eventoIdCuotas}
&CUOTAS=${(this.cantcuotas > 0 ? "1" : "0")}
&CANTCUOTA=${this.cantcuotas.toString()}
&CUOTASPAGAR=${this.cuotaspagar.toString()}
&MONTOCUOTA=${this.montocuotas.toString()}`; */
    let url = `${this.basepath}GenerarOrden`;

    let params = {
      TOKEN: this._up.credenciales.accessToken!,
      TIPO: this._up.credenciales.providerId!,
      EVENTO: this.eventoIdCuotas,
      CUOTAS: (this.cantcuotas > 0 ? "1" : "0"),
      CANTCUOTA: this.cantcuotas.toString(),
      CUOTASPAGAR: this.cuotaspagar.toString(),
      MONTOCUOTA: this.montocuotas.toString(),
      NIT: this.nit,
      RAZONSOCIAL: this.nombre,
      EMAIL: this.correo,
      TIPORECEPTOR: this._up.perfil.tipoRecetor
    };

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

  rehacer_asignacion(evento_id:any){
    let url = `${this.basepath}RehacerAsignacion`;

    let params = {
      TOKEN: this._up.credenciales.accessToken!,
      TIPO: this._up.credenciales.providerId!,
      EVENTO: evento_id,
    };

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

  async cargar_asignados(hiddeLoading?:boolean){
    let url = `${this.basepath}Asignados?TOKEN=${this._up.credenciales.accessToken!}&TIPO=${this._up.credenciales.providerId!}`;

    let asignadosObserver = this.http.get(url)
    .pipe(
      map(resp => JSON.parse(JSON.stringify(resp))),
      catchError(err=>{
        /* if(err._body == "\"Usuario no encontrado\"" && this._up.logueado){
          this._up.cerrar_sesion();
        } */
        return of("");
      })
    );

    let asignadosRet = await lastValueFrom(asignadosObserver);

      
    this.asignados = asignadosRet;
    this.transmisiones = 0;
    this.asignados.forEach(evAsig => {
      evAsig.Encuestas.forEach((encuesta:any) => {

        let preguntas:any[] = [];
        encuesta.Preguntas.forEach((pregunta:any) => {
          //if(pregunta.Formato_Respuesta == "4"){
            if(!this.busca_Pregunta(preguntas,pregunta.Pregunta)){
              preguntas.push(pregunta);
            }
          //}
          //else{
          //  preguntas.push(pregunta);
          //}
        });

        let opciones:any[] = [];
        preguntas.forEach(element => {
          let opciones:any[] = [];
          encuesta.Preguntas.forEach((element2:any) => {
            if(element2.Pregunta == element.Pregunta){
              opciones.push({Respuesta:element2.Respuesta, Descripcion_Respuesta:element2.Descripcion_Respuesta, checked:null});
            }
          });
          element["Opciones"] = opciones;

        });

        encuesta.Preguntas = preguntas;

      });
      
      evAsig.Videoconferencias.forEach((transmision:any) => {
        if(transmision.Flagconferencia == 1){
          this.transmisiones = this.transmisiones + 1;
        }
      });
    });

    if(this.asignados.length > 0){
      this._up.pagesInit.forEach(page => {
        if(page.title == 'VIRTUAL_BADGE') {
          page.show = true;
        }
      });
      this._up.pages = this._up.pagesInit.filter(page => {
        return page.show === true;
      });
    }


  }

  busca_Pregunta(preguntas: any[], pregunta: any): boolean {
    return preguntas.some(p => p.Pregunta === pregunta);
  }
}
