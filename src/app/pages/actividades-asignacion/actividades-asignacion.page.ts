import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, ModalController, ToastController } from '@ionic/angular';
import { lastValueFrom } from 'rxjs';
import { EventosService } from 'src/app/services/eventos/eventos.service';

@Component({
  selector: 'app-actividades-asignacion',
  templateUrl: './actividades-asignacion.page.html',
  styleUrls: ['./actividades-asignacion.page.scss'],
})
export class ActividadesAsignacionPage implements OnInit {

  loading:any;
  actividades:any = [];
  activGroup:any = [];
  activGroupArr:any = [];
  eventoHead:any = null;
  evento:any;
  isTrack = true;
  isOptional = false;

  constructor(
    private _ep: EventosService,
    private router: Router,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private modalCtrl: ModalController
  ) {
    if(this.router.getCurrentNavigation()?.extras.state){
      this.eventoHead = this.router.getCurrentNavigation()?.extras.state!['evento'];
      this.evento = this.eventoHead.Evento;

      if(this.eventoHead != null && this.eventoHead.Asignarportrack == 1) {
        this.isTrack = true;
      }
    }
  }

  async ngOnInit() {
    //this.evento = "842";
    this.evento = "818";
    this.cargarActividades();
  }


  async showLoader(msg:string){
    this.loading = await this.loadingCtrl.create({
      spinner: null,
      cssClass: 'custom-loading',
    });
    await this.loading.present();
  }

  groupBy(arr:any, key:any) {
    return arr.reduce(function(rv:any, x:any) {
      let date = new Date(x.Horaini);
      let key = date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear() + " de " + x.Rangohora;
      (rv[key] = rv[key] || []).push(x);
      return rv;
    }, {});
  }

  async cargarActividades(){
    let ActivAsgObserver = this._ep.cargar_actividades_asignacion(this.evento);
    let ActivAsg = await lastValueFrom(ActivAsgObserver);
    console.log(ActivAsg);
    if(this.isTrack) {
      ActivAsg.Formularios = ActivAsg.Formularios.filter((actividad:any) => actividad.Track != null);
    }
    
    this.actividades = ActivAsg["Formularios"];
    this.activGroup = this.groupBy(this.actividades, 'Horaini');
    // converti objeto activeGroup a array
    this.activGroupArr = Object.keys(this.activGroup).map(key => ({ key, value: this.activGroup[key] }));
    if(this.loading){
      this.loading.dismiss();
    }

    if(this.actividades.length == 0) {
      this.modalCtrl.dismiss(null);
    }
  }

  async seleccionarActividad(actividad:any,evento:any){
    await this.showLoader("");
    this._ep.seleccionar_actividad(actividad,evento)
    .subscribe(async (data)=>{
      console.log(data);
      if('ok' in data && !data.ok){
        (await this.toastCtrl.create({
          message: data.error,
          position: 'bottom',
          color: 'danger',
          duration: 5000,
          buttons: ["Ok"]
        })).present();
      }else{
        (await this.toastCtrl.create({
          message: data.mensaje,
          position: 'bottom',
          color: 'success',
          duration: 4000,
          buttons: ["Ok"]
        })).present();
      }
      this.cargarActividades();
    });
  }

}
