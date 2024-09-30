import { Component, OnInit } from '@angular/core';
import { CarritoService } from 'src/app/services/carrito/carrito.service';
import { CuotasPage } from '../cuotas/cuotas.page';
import { PagoPage } from '../pago/pago.page';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-popover',
  templateUrl: './popover.page.html',
  styleUrls: ['./popover.page.scss'],
})
export class PopoverPage implements OnInit {

  loading:any;
  cuotas = CuotasPage;
  pago = PagoPage;

  constructor(
    public _cp:CarritoService,
    private loadingCtrl:LoadingController
  ) { 
    this.showLoader("");
    this._cp.cargar_cuotas(this._cp.eventoIdCuotas)
    .subscribe(data => {
      this._cp.detalle_cuotas = data.cuotas;
      this.loading.dismiss();

      if(this._cp.detalle_cuotas.length == 0) {
        this.closePopover(-1);
      }
    })
  }

  ngOnInit() {
  }

  async getTextLoading(msg:string) {
    return await this._cp.translateSer(msg);
  }

  async showLoader(msg:string){
    this.loading = await this.loadingCtrl.create({
      spinner: "bubbles",
      message: msg,
    });
    await this.loading.present();
  }

  closePopover(item?:any){
    //this.viewCtrl.dismiss(item);
  }

}
