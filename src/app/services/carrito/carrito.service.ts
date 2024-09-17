import { Injectable } from '@angular/core';

// Moduls
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { UsuarioService } from '../usuario/usuario.service';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';

import { url_services } from "../../config/url.services";
import { CarritoRoot } from 'src/app/interfaces/Carrito';
import { NavController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  basepath = url_services;

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
    private navCtrl:NavController
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
        map(res=>JSON.stringify(res))
      )
      .subscribe(data=>{
        let carrito = JSON.parse(data) as CarritoRoot;
          switch (index) {
            case 1:this.items = carrito.Carrito;this.calcular_total();break;
            //case 2:this.pendiente_pago = carrito;break;
            //case 3:this.ordenes_vencidas = carrito;break;
            //case 4:this.cuotas_pendientes = carrito;break;
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
}
