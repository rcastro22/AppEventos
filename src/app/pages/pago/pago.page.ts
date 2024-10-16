import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController, ModalController, NavController } from '@ionic/angular';
import { CarritoService } from 'src/app/services/carrito/carrito.service';
import { EncuestaService } from 'src/app/services/encuesta/encuesta.service';
import { FormularioPage } from '../formulario/formulario.page';
import { VerOrdenPage } from '../ver-orden/ver-orden.page';
import { catchError, of } from 'rxjs';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';

@Component({
  selector: 'app-pago',
  templateUrl: './pago.page.html',
  styleUrls: ['./pago.page.scss'],
})
export class PagoPage implements OnInit {

  loading:any;

  public detailPayment = {
    nit: "",
    cf: true,
    nombre: "CONSUMIDOR FINAL",
    correo: this._up.perfil.email,
  }

  constructor(
    private _enp:EncuestaService,
    private _cp:CarritoService,
    private _up:UsuarioService,
    private modalCtrl:ModalController,
    private loadingCtrl:LoadingController,
    private alertCtrl:AlertController,
    private navCtrl:NavController
  ) { }

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

  ordenPago(){
    this.validaFormulario()
  }


  async genOP(){
    await this.showLoader(await this.getTextLoading("PROCESS_PAY_ORDER"));

    this._cp.generar_orden_pago()
    .subscribe(async (data) => {
      this.loading.dismiss();
      console.log(data);
      if(data.ok == false) {
        let alert = this.alertCtrl.create({
          header: await this._cp.translateSer("ORDER_ERROR"),
          buttons: [await this._cp.translateSer("OK")]
        });
        (await alert).present();
        (await alert).onDidDismiss();
        this._cp.cargar_carrito();
        this.navCtrl.navigateRoot("tabs/tabTodos");
      }
      else {
        let alert = this.alertCtrl.create({
          header: await this._cp.translateSer("PAY_ORDER"),
          subHeader: await this._cp.translateSer("PAYMENT_ORDER_GENERATED"),
          buttons: [await this._cp.translateSer("OK")]
        });
        (await alert).present();
        (await alert).onDidDismiss();
        this._cp.cargar_carrito();
        let orden = await this.modalCtrl.create({
          component: VerOrdenPage,
          componentProps: {'orden':data}
        });
        (await orden).present();
        (await orden).onDidDismiss();
        this.navCtrl.navigateRoot("carrito");
      }
    });
    /* .catch(async err=>{
      this.loading.dismiss();
      let alrt = this.alertCtrl.create({
        title: await this._cp.translateSer("ORDER_ERROR"),
        subTitle: err._body,
        buttons: [await this._cp.translateSer("OK")]
      });
      alrt.present();
      alrt.onDidDismiss(()=>{
        this._cp.cargar_carrito();
        this.navCtrl.popToRoot();
      })

      return Observable.from("");

    }) */
    /* .subscribe(async data=>{
      this.loading.dismiss();
      if(data != "")
      {
        let alrt = this.alertCtrl.create({
          title: await this._cp.translateSer("PAY_ORDER"),
          subTitle: await this._cp.translateSer("PAYMENT_ORDER_GENERATED"),
          buttons: [await this._cp.translateSer("OK")]
        });
        alrt.present();
        alrt.onDidDismiss(noorden=>{
          this._cp.cargar_carrito();
          let orden = this.modalCtrl.create(VerOrdenPage,{'orden':data});
          orden.present();
          orden.onDidDismiss(()=>{
            this.navCtrl.popTo('CarritoPage');
          })
        });
      }
    }); */
  }


  async validaFormulario(){
    this._enp.obtener_encuesta(this._cp.eventoIdCuotas)
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
          this.genOP();
        }
      }
      else{
        this.genOP();
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


  changeCF(){
    if(this.detailPayment.cf == true){
      this.detailPayment.nombre = "CONSUMIDOR FINAL";
    }
    else{
      this.detailPayment.nit = this._up.perfil.nit;
      this.detailPayment.nombre = this._up.perfil.nombres + " " + this._up.perfil.apellidos;
    }
  }

}
