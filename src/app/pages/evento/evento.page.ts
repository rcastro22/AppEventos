import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ActionSheetController, AnimationController, ModalController } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { DetalleLogin } from 'src/app/interfaces/DetalleLogin';
import { CarritoService } from 'src/app/services/carrito/carrito.service';
import { EventosService } from 'src/app/services/eventos/eventos.service';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';

@Component({
  selector: 'app-evento',
  templateUrl: './evento.page.html',
  styleUrls: ['./evento.page.scss'],
})
export class EventoPage implements OnInit {
    
  evento:any;
  segmento:string = 'event';
  calendario:string = "";
  detalleCalendario:any;
  agendaDia:any = [];
  isModalOpen:boolean = false;
  rutaImagenModal:string = "";

  constructor(
    private actionSheetCtrl: ActionSheetController,
    private modalCtrl: ModalController,
    public router: Router,
    public location: Location,
    public _ep:EventosService,
    public _cp:CarritoService,
    public _up:UsuarioService,
    private animationCtrl: AnimationController
  ) { 
    addIcons({
      "cart-plus": "assets/icon/mdi--cart-plus.svg",
      "content-view-filled": "assets/icon/fluent--content-view-gallery-20-filled.svg",
      "content-view-regular": "assets/icon/fluent--content-view-gallery-20-regular.svg",
      "calendar-schedule": "assets/icon/akar-icons--schedule.svg",
      "calendar-schedule-fill": "assets/icon/ri--calendar-schedule-fill.svg",
      "diploma-outline": "assets/icon/mdi--diploma-outline.svg",
      "diploma-sharp": "assets/icon/mdi--diploma.svg",     
    })
  }

  ngOnInit() {
    if(this.router.getCurrentNavigation()?.extras.state){
      this.evento = this.router.getCurrentNavigation()?.extras.state!['evento'];
    }

    this._ep.evento_detalle = {} as DetalleLogin;
    console.log(this._ep.evento_detalle.Detalle);
  }


  returnPage() {
    this.location.back();
  }

  ionViewDidEnter(){
    console.log("entro");
    
    this._ep.cargar_detalle(this.evento);
  }

  setDefaultCalendar(){
    console.log(this._ep.agenda[0].fecha);
    
    this.calendario = this._ep.agenda[0].fecha;
    this.detalleCalendario = this._ep.agenda[0];
    this.llenar_agenda();
  }

  changeCalendar(fecha:any){
    this.detalleCalendario = fecha;
    this.llenar_agenda();
  }

  llenar_agenda(){
    this.agendaDia = [];
    let filtrado = [];
    //if(idx > this._ep.agenda.length - 1){
    //  idx = this._ep.agenda.length - 1;
    //}
    //this.slideActivo = idx;
    //this.title = this._ep.agenda[idx].fecha;  
    //moment.locale('es');  
    //this.title = moment(this._ep.agenda[idx].fecha).format("dddd D MMM YYYY");

    filtrado = this._ep.evento_detalle['Agenda'].filter(detalle=>{
        let respuesta = false;
        console.log(new Date(detalle.Fecha_Actividad));
        console.log(this.detalleCalendario.fecha);
        
        if(new Date(detalle.Fecha_Actividad) == this.detalleCalendario.fecha){
          respuesta = true;
        }
        return respuesta;    

    });
    this.agendaDia = filtrado;
    
  }


  cancel() {
    return this.modalCtrl.dismiss(null, 'confirm');
  }

  canDismiss = async () => {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Are you sure?',
      buttons: [
        {
          text: 'Yes',
          role: 'confirm',
        },
        {
          text: 'No',
          role: 'cancel',
        },
      ],
    });

    actionSheet.present();

    const { role } = await actionSheet.onWillDismiss();

    return role === 'confirm';
  };
  

  async presentActionSheet() {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Agregar a carrito?',
      buttons: [
        {
          text: 'Si',
          /* role: 'destructive',
          data: {
            action: 'delete',
          }, */
        },
        {
          text: 'No',
          /* data: {
            action: 'share',
          }, */
        },
        /* {
          text: 'Cancel',
          role: 'cancel',
          data: {
            action: 'cancel',
          },
        }, */
      ],
    });

    await actionSheet.present();
  }


  canDismiss2 = async () => {
    console.log("entro");
    
    this.isModalOpen = false;
    return true;
  };

  openModal(ruta:string){
    this.isModalOpen = true;
    this.rutaImagenModal = ruta;
  }

  enterAnimation = (baseEl: HTMLElement) => {
    const root = baseEl.shadowRoot;

    const backdropAnimation = this.animationCtrl
      .create()
      .addElement(root!.querySelector('ion-backdrop')!)
      .fromTo('opacity', '0.01', 'var(--backdrop-opacity)');

    const wrapperAnimation = this.animationCtrl
      .create()
      .addElement(root!.querySelector('.modal-wrapper')!)
      .keyframes([
        { offset: 0, opacity: '0', transform: 'scale(0)' },
        { offset: 1, opacity: '0.99', transform: 'scale(1)' },
      ]);

    return this.animationCtrl
      .create()
      .addElement(baseEl)
      .easing('ease-out')
      .duration(500)
      .addAnimation([backdropAnimation, wrapperAnimation]);
  };

  leaveAnimation = (baseEl: HTMLElement) => {
    return this.enterAnimation(baseEl).direction('reverse');
  };

}
