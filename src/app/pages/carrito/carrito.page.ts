import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController, ModalController, PopoverController } from '@ionic/angular';
import { lastValueFrom } from 'rxjs';
import { CarritoService } from 'src/app/services/carrito/carrito.service';
import { EventosService } from 'src/app/services/eventos/eventos.service';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';
import { PopoverPage } from '../popover/popover.page';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.page.html',
  styleUrls: ['./carrito.page.scss'],
})
export class CarritoPage implements OnInit {

  loading:any;

  constructor(
    private _up:UsuarioService,
    private _ep:EventosService,
    public _cp:CarritoService,
    private loadingCtrl:LoadingController,
    private modalCtrl:ModalController,
    private alertCtrl:AlertController,
    private popoverCtrl:PopoverController
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
      //translucent: true,
      //showBackdrop: false,
      //mode: "ios",
      //animated: true
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

    let ret = await popOv.onDidDismiss();

    console.log(ret);
    
    
    /* .then(valor=>{
      if(valor != null && valor != -1){
        this.navCtrl.push(this.cuotas,{'cuotas':valor})
      }else if(valor == -1){
        this.navCtrl.push(this.pago);
      }
    }); */
  }

}





/* @Component({
  selector: 'app-popover',
  template : `
  <ion-list radio-group class="popover-page">
    <ion-item-divider color="dark">{{ 'METHOD_PAYMENT' | translate }}</ion-item-divider>
    <ion-button ion-item (click)="closePopover(-1)">
            <ion-icon ios="cash-outline" md="cash-sharp" slot="start"></ion-icon> {{ 'FULL_PAYMENT' | translate }}
        </ion-button>
    @for(item of this._cp.detalle_cuotas; track item){
      <ion-button (click)="closePopover(item)">
            <ion-icon ios="calendar-outline" md="calendar-sharp"></ion-icon> {{item.Cantcuota}} {{ 'INSTALLMENTS' | translate }}
      </ion-button>
    }
  </ion-list>
  `
})
export class PopoverPage {
  constructor(
    public loadingCtrl: LoadingController
  ){}
} */
