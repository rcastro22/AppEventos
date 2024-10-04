import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController, ModalController, NavController, PopoverController } from '@ionic/angular';
import { lastValueFrom } from 'rxjs';
import { CarritoService } from 'src/app/services/carrito/carrito.service';
import { EventosService } from 'src/app/services/eventos/eventos.service';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';
import { PopoverPage } from '../popover/popover.page';
import { CuotasPage } from '../cuotas/cuotas.page';
import { PagoPage } from '../pago/pago.page';
import { VerOrdenPage } from '../ver-orden/ver-orden.page';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.page.html',
  styleUrls: ['./carrito.page.scss'],
})
export class CarritoPage implements OnInit {

  loading:any;
  cuotas = CuotasPage;
  pago = PagoPage;

  constructor(
    private _up:UsuarioService,
    private _ep:EventosService,
    public _cp:CarritoService,
    private loadingCtrl:LoadingController,
    private modalCtrl:ModalController,
    private alertCtrl:AlertController,
    private popoverCtrl:PopoverController,
    private navCtrl:NavController
  ) { }

  ngOnInit() {
  }

  ionViewDidEnter(){
    this._cp.cargar_carrito();
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

  async eliminarCarrito(evento:any,tipo:any){
    await this.showLoader(await this.getTextLoading("PLEASE_WAIT"));
    await lastValueFrom(this._cp.eliminar_carrito(evento,tipo));
    this._cp.cargar_carrito();
    this.loading.dismiss();
    this._ep.cargar_eventos()
    .subscribe(data=>{
      this._ep.eventos = data.Eventos;
      this._ep.categorias = data.Categorias;
    });
  }

  /* Alert para Descuento */
  async showPrompt(event:any) {
    let prompt = this.alertCtrl.create({
      header: await this._up.translateSer("DISCOUNT"),
      message: await this._up.translateSer("ENTER_DISCOUNT_CODE"),
      inputs: [
        {
          name: 'descuento',
          placeholder: await this._up.translateSer("CODE")
        },
      ],
      buttons: [
        {
          text: await this._up.translateSer("CANCEL"),
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: await this._up.translateSer("OK"),
          handler: data => {
            this._cp.aplicar_descuento(event.Evento,data.descuento);
          }
        }
      ]
    });
    (await prompt).present();
  }

  /* Popover para pago directo o cuotas */
  async presentPopover(myEvent:MouseEvent,evento:any) {
    this._cp.detalle_cuotas = [];
    this._cp.eventoIdCuotas = evento.Evento;
    this._cp.cantcuotas = 0;
    this._cp.cuotaspagar = 0;
    this._cp.montocuotas = 0;

    let popOv = await this.popoverCtrl.create({
      component: PopoverPage,
      event: myEvent
    });
    (await popOv).present();

    const {data, role} = await popOv.onDidDismiss();
    
    if(data != null && data != -1) {
      this.navCtrl.navigateForward("cuotas",{state:{"cuotas":data}});
    }
    else if(Number(data) == -1) {
      this.navCtrl.navigateForward("pago");
    }
  }

  async rehacerAsig(evento:any){
    await this.showLoader(await this.getTextLoading("PLEASE_WAIT"));

    this._cp.rehacer_asignacion(evento["Evento"])
    .subscribe(async data=>{
      this.loading.dismiss();
      (await this.alertCtrl.create({
        header: await this._up.translateSer("PAY_ORDER"),
        subHeader: await this._up.translateSer("PAYMENT_ORDER_GENERATED"),
        buttons: [
          {
            text: await this._up.translateSer("OK"),
            handler: data => {
              this._cp.cargar_carrito();
            }
          }]
      })).present();
    })
  }

  async pendientePago(item:any){
    await this.showLoader(await this.getTextLoading("PLEASE_WAIT"));
    this._cp.eventoIdCuotas = item.Evento;
    this._cp.cargar_cuotas(this._cp.eventoIdCuotas)
    .subscribe(data=>{
      this._cp.detalle_cuotas = data.cuotas;
      this.loading.dismiss();

      this._cp.detalle_cuotas.forEach(element => {
        if(element.Cantcuota == item.Pagos){
          /* this.navCtrl.push(this.cuotas,{'cuotas':element}); */
          this.navCtrl.navigateForward("cuotas",{state:{"cuotas":element}});
        }
      });
    })
  }

  async mostrarOrden(item:any){
    let orden = await this.modalCtrl.create({
      component: VerOrdenPage,
      componentProps: {'orden':item["Ordendepago"]}
    });
    (await orden).present();
  }

}