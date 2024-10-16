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
    this._cp.cargar_asignados()
    .subscribe(data=>{
      this.loading.dismiss();
      this._cp.asignados = data;
      this._cp.transmisiones = 0;
      this._cp.asignados.forEach(evAsig => {
        evAsig.Encuestas.forEach((encuesta:any) => {

          let preguntas:any[] = [];
          encuesta.Preguntas.forEach((pregunta:any) => {
            //if(pregunta.Formato_Respuesta == "4"){
              if(!this.busca_Pregunta(preguntas,pregunta.Pregunta)){
                preguntas.push(pregunta);
              }
            //}
            //else{
            //  preguntas.push(pregunta);
            //}
          });

          let opciones:any[] = [];
          preguntas.forEach(element => {
            let opciones:any[] = [];
            encuesta.Preguntas.forEach((element2:any) => {
              if(element2.Pregunta == element.Pregunta){
                opciones.push({Respuesta:element2.Respuesta, Descripcion_Respuesta:element2.Descripcion_Respuesta, checked:null});
              }
            });
            element["Opciones"] = opciones;

          });

          encuesta.Preguntas = preguntas;

        });
        
        evAsig.Videoconferencias.forEach((transmision:any) => {
          if(transmision.Flagconferencia == 1){
            this._cp.transmisiones = this._cp.transmisiones + 1;
          }
        });
      });

      if(this._cp.asignados.length > 0){
        this._up.pagesInit.forEach(page => {
          if(page.title == 'VIRTUAL_BADGE') {
            page.show = true;
          }
        });
        this._up.pages = this._up.pagesInit.filter(page => {
          return page.show === true;
        });
      }

    });
  }

  busca_Pregunta(preguntas: any[], pregunta: any): boolean {
    return preguntas.some(p => p.Pregunta === pregunta);
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
    this.router.navigate(['/detalle-asignado'],{queryParams:{asig:asig}});
  }

}
