import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ActionSheetController, AlertController, AnimationController, LoadingController, ModalController } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { DetalleLogin } from 'src/app/interfaces/DetalleLogin';
import { CarritoService } from 'src/app/services/carrito/carrito.service';
import { EncuestaService } from 'src/app/services/encuesta/encuesta.service';
import { EventosService } from 'src/app/services/eventos/eventos.service';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';
import { FormularioPage } from '../formulario/formulario.page';
import { lastValueFrom } from 'rxjs';
import { ActividadesAsignacionPage } from '../actividades-asignacion/actividades-asignacion.page';
import { PrecondicionesPage } from '../precondiciones/precondiciones.page';

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
  loading:any;

  constructor(
    private actionSheetCtrl: ActionSheetController,
    private modalCtrl: ModalController,
    public router: Router,
    public location: Location,
    public _ep:EventosService,
    public _cp:CarritoService,
    public _up:UsuarioService,
    private _enp:EncuestaService,
    private animationCtrl: AnimationController,
    private loadingCtrl:LoadingController,
    private alertCtrl:AlertController
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


  /* Agregar evento al carrito */
  async presentActionSheet() {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Agregar a carrito?',
      buttons: [
        {
          text: 'Si',
          role: 'yes',
        },
        {
          text: 'No',
          role: 'No',
        },
      ],
    });

    await actionSheet.present();

    const { role } = await actionSheet.onWillDismiss();
    console.log(this.evento.Evento);
    if(role == 'yes'){
      this.validaFormulario();
    }
  }

  async addCart(){
    if(!this._up.logueado){
      await this._up.valida_login(document.querySelector('ion-page'),true);
    }
    if(this._up.logueado){
      console.log("agrga carrito");
      await this.showLoader(""); 
      this._cp.agregar_carrito(this.evento)
      .subscribe(async data => {
        this.loading.dismiss();
        console.log(data);
        if(data) {
          if(data.Error) {
            let alert = this.modalCtrl.create({component: PrecondicionesPage});
            (await alert).present();
          } else {

            let ActivAsgObserver = this._ep.cargar_actividades_asignacion(this.evento.Evento);
            let ActivAsg = await lastValueFrom(ActivAsgObserver);
            
            if(ActivAsg["Formularios"].length > 0) {
              let modal = await this.modalCtrl.create({
                component:ActividadesAsignacionPage, 
                componentProps: {'eventoHead':this.evento}});
              (await modal).present();
              const {data, role} = await modal.onDidDismiss();
            }


            let alert = this.alertCtrl.create({
              header: await this._up.translateSer("ADDED"),
              message: data.Mensaje,
              buttons: ["Ok"]
            });
            (await alert).present();
            this._cp.cargar_carrito();
            this._ep.cargar_eventos().subscribe(data=>{
              this._ep.eventos = data.Eventos;
              this._ep.categorias = data.Categorias;
            });
            if(this.evento.Precio != null && this.evento.Precio != 0) {
              this.router.navigate(["/carrito"]);
            }
          }
        }
      })
    }
  }

  async validaFormulario(){
    if(!this._up.logueado) {
      await this._up.valida_login(document.querySelector('ion-page'),true);
    }
    if(this._up.logueado) {

    }
    this._enp.obtener_encuesta(this.evento.Evento)
    .subscribe(async (data)=>{
      this._enp.encuesta = data;

      this._enp.encuesta["Formularios"].forEach((encuesta:any) => {
        let preguntas:any[] = [];
          encuesta.PreguntasFormulario.forEach((pregunta:any) => {
              if(!this.busca_Pregunta(preguntas,pregunta.Pregunta)){
                preguntas.push(pregunta);
              }
          });

          let opciones:any[] = [];
          preguntas.forEach(element => {
            let opciones:any[] = [];
            encuesta.PreguntasFormulario.forEach((element2:any) => {
              if(element2.Pregunta == element.Pregunta){
                opciones.push({Respuesta:element2.Respuesta, Descripcion_Respuesta:element2.Descripcion_Respuesta, checked:null});
              }
            });
            element["Opciones"] = opciones;

          });

          encuesta.PreguntasFormulario = preguntas;
      });

      if(this._enp.encuesta["Formularios"].length > 0){
        let modal = await this.modalCtrl.create({component:FormularioPage});
        (await modal).present();
        const {data, role} = await modal.onDidDismiss();
        if(data == true) {
          this.addCart();
        }
      }
      else{
        this.addCart();
      }

    })
  }

  busca_Pregunta(preguntas:any,pregunta:any){
    let existe = false;
    preguntas.forEach((preg:any) => {
      if(preg.Pregunta == pregunta){
        existe = true;
      }
    });

    return existe;
  }



  /* Agenda */
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



  /* Modal Imagen */
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
