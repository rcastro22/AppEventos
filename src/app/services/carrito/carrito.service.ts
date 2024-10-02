import { Injectable } from '@angular/core';

// Moduls
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { UsuarioService } from '../usuario/usuario.service';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';

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
    let url = `${this.basepath}AgregarCarrito?TOKEN=${this._up.credenciales.accessToken}&TIPO=${this._up.credenciales.providerId}&EVENTO=${evento.Evento}`;

    /* let data = new URLSearchParams();
    data.append("TOKEN", this._up.credenciales.accessToken!);
    data.append("TIPO", this._up.credenciales.providerId!);
    data.append("EVENTO",evento.Evento); */

    let data = {};

    return this.http.post(url,data)
    .pipe(
      catchError(err => {
        if(err.status == 400) {
          this.precondiciones = [];
          try{
            let prec = JSON.parse(err._body);
            prec.Precondiciones.forEach((element:any) => {
              this.precondiciones.push({'Precondiciones':[{'Descripcion':element.Descripcion,'Cumple':element.Cumple}]});
            });
          } catch (error) {
            this.precondiciones.push({'Precondiciones':[{'Description':err._body,'Cumple':false}]});
          }
          return of([{'carrito':null,'Error':err._body}]).pipe(resp => JSON.parse(JSON.stringify(resp)));
        }
        else {
          return of([{'carrito':null}]).pipe(resp => JSON.parse(JSON.stringify(resp)));
        }
      }),
      map(res => JSON.parse(JSON.stringify(res))),
    )

  }

  eliminar_carrito(evento:any,tipoCarrito:number){

    let url = `${this.basepath}QuitarDeCarrito?TOKEN=${this._up.credenciales.accessToken}&TIPO=${this._up.credenciales.providerId}&EVENTO=${evento.Evento}`;
    //let url = `${this.basepath}QuitarDeCarrito`;

    let data = {};
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
    let url = `${this.basepath}GenerarOrden?TOKEN=${this._up.credenciales.accessToken!}
&TIPO=${this._up.credenciales.providerId!}
&EVENTO=${this.eventoIdCuotas}
&CUOTAS=${(this.cantcuotas > 0 ? "1" : "0")}
&CANTCUOTA=${this.cantcuotas.toString()}
&CUOTASPAGAR=${this.cuotaspagar.toString()}
&MONTOCUOTA=${this.montocuotas.toString()}`;

    let params = {};
    /* let params = new URLSearchParams();
    params.append("TOKEN", this._up.credenciales.accessToken!);
    params.append("TIPO", this._up.credenciales.providerId!);
    params.append("EVENTO", this.eventoIdCuotas);
    params.append("CUOTAS", (this.cantcuotas > 0 ? "1" : "0"));
    params.append("CANTCUOTA", this.cantcuotas.toString());
    params.append("CUOTASPAGAR", this.cuotaspagar.toString());
    params.append("MONTOCUOTA", this.montocuotas.toString()); */

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
