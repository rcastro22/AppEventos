import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController, ModalController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { CarritoService } from 'src/app/services/carrito/carrito.service';
import { EventosService } from 'src/app/services/eventos/eventos.service';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';
import { Login } from 'src/app/interfaces/Login';
import { EventoPage } from '../evento/evento.page';
import { addIcons } from 'ionicons';
import { Storage } from '@ionic/storage';



@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  component = EventoPage;
  loading:any;
  eventoBuscar:any[] = [];
  categoria:string = "Todos";

  constructor(
    public _ep:EventosService,
    public _up:UsuarioService,
    public _cp:CarritoService,
    private alertCtrl:AlertController,
    public translateService:TranslateService,
    private loadingCtrl:LoadingController,
    private modalCtrl: ModalController,
  ) {
    addIcons({
      "diploma-outline": "assets/icon/mdi--diploma-outline.svg",
      "diploma-sharp": "assets/icon/mdi--diploma.svg",      
    })
    //this.translateService.setDefaultLang('es');
    //this.translateService.use('es');
   }

  async ngOnInit() {
    let value = await this.getTextLoading();
    await this.showLoader(value); 
    //this.getTextLoading().then((value) => {
    //  this.showLoader(value);
    //});
    console.log("GetEvents");
    

    await this._up.verifica_login2().catch(()=>this._up.cerrar_sesion());
    console.log(this._up.logueado);
    
    this.cargar_eventos().then(()=>{
      this.loading.dismiss();
    });
    
    
  }

  handleRefresh(event:any) {
    setTimeout(() => {
      // Any calls to load data go here
      event.target.complete();
    }, 2000);
  }

  async getTextLoading() {
    return await this._cp.translateSer("LOADING_DATA");
  }

  async showLoader(msg:string){
    this.loading = await this.loadingCtrl.create({
      //spinner: "bubbles",
      spinner: null,
      //message: msg,
      cssClass: 'custom-loading',
      //translucent: true,
      //showBackdrop: false,
      //mode: "ios",
      //animated: true
    });
    await this.loading.present();
  }

  cargar_eventos(val?:any){
    let promesa = new Promise((resolve,reject)=>{
      this._ep.cargar_eventos().subscribe(data=>{
        this._ep.eventos = data.Eventos
        this._ep.categorias = data.Categorias;
        console.log(this._ep.eventos);
        console.log(data);
        console.log(this._up.logueado);
        
        if(this._up.logueado){
          this._cp.cargar_carrito();
          this._cp.cargar_asignados().subscribe(data => {
            this._cp.asignados = data;
          });
        }

        if (val && val.trim() != '') {
          this.eventoBuscar = this._ep.buscar_evento(val)
        }else{
          this.eventoBuscar = this._ep.eventos;
        } 
        resolve(0);
      });
    })
    return promesa;
  }

  async openDetailEvent() {
    const modal = await this.modalCtrl.create({
      component: EventoPage,
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'confirm') {
      //this.message = `Hello, ${data}!`;
    }
  }


  async showRadioLang() {
    let alert = this.alertCtrl.create({
      header: await this._up.translateSer("LANGUAGE"),
      message: await this._up.translateSer("SELECT_LANG"),
      inputs: [
        {
          type: 'radio',
          label: 'Español',
          value: 'es',
          checked: (this._up.language == 'es' ? true : false)
        }, {
          type: 'radio',
          label: 'English',
          value: 'en',
          checked: (this._up.language == 'en' ? true : false)
        },
      ],
      buttons: [
        {
          text: await this._up.translateSer("CANCEL"),
          role: 'buttom',
          cssClass: 'secondary',
        }, {
          text: await this._up.translateSer("OK"),
          role: 'buttom',
          handler: (data) => {
            this.translateService.use(data);
            this._up.language = data;
            this._up.guardar_storage();
          }
        }
      ]
    });

    (await alert).present();
   
  }

  changeCategory(category:any) {
    if(category == "0") {
      this.eventoBuscar = this._ep.eventos;
    }
    else {
      this.eventoBuscar = this._ep.por_Categoria(category);
    }
  }

}
