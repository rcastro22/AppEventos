import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { CarritoService } from 'src/app/services/carrito/carrito.service';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';

@Component({
  selector: 'app-asignados',
  templateUrl: './asignados.page.html',
  styleUrls: ['./asignados.page.scss'],
})
export class AsignadosPage implements OnInit {

  loading:any;

  constructor(
    private _up:UsuarioService,
    public _cp:CarritoService,
    public loadingCtrl:LoadingController,
    public router:Router,
  ) { }

  async ngOnInit() {
    await this.showLoader("");
    this._cp.cargar_asignados().then(()=>{
      this.loading.dismiss();
    });
    
  }
  

  async getTextLoading(msg:string) {
    return await this._cp.translateSer(msg);
  }

  async showLoader(msg:string){
    this.loading = await this.loadingCtrl.create({
      spinner: null,
      cssClass: 'custom-loading',
      //message: msg,
    });
    await this.loading.present();
  }

  verDetalle(asig:any){
    //this.navCtrl.push(DetalleAsignadoPage,{'asig':asig})
    //this.router.navigate(['/detalle-asignado'],{queryParams:{asig:asig}});
    console.log(asig);
    this.router.navigate(['/evento',asig.Evento]);
  }

}
