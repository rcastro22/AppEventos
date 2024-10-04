import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { EncuestaService } from 'src/app/services/encuesta/encuesta.service';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.page.html',
  styleUrls: ['./formulario.page.scss'],
})
export class FormularioPage implements OnInit {

  constructor(
    public _enp:EncuestaService,
    private modalCtrl:ModalController,
    private toastCtrl:ToastController
  ) { }

  ngOnInit() {
  }

  cancelar() {
    this.modalCtrl.dismiss();
  }

  async enviarForm(){
    let preguntas:any[] = [];
    let respuestas:any[] = [];
    let validarForm:boolean = true;

    this._enp.encuesta["Formularios"][0].PreguntasFormulario.forEach((element:any) => {
      if(element["Obligatorio"] == 1) {
        if(element["Respuesta"] == null) {
          validarForm = false;
        }
      }

      if(element["Formato_Respuesta"] != 6 && element["Formato_Respuesta"] != 7){
        preguntas.push(element["Pregunta"]);
        respuestas.push(element["Respuesta"]);
      }else if(element["Formato_Respuesta"] == 6 || element["Formato_Respuesta"] == 7){
        element["Opciones"].forEach((opc:any) => {
          if(opc["checked"] == true){
            preguntas.push(element["Pregunta"]);
            respuestas.push(opc["Respuesta"]);
          }
        });
      }
    });

    if(validarForm == true) {

      this._enp.responder_encuesta(JSON.stringify(preguntas),JSON.stringify(respuestas),this._enp.encuesta["Formularios"][0].Encuesta,this._enp.encuesta["Formularios"][0].Portal)
      .subscribe(data=>{
        this.modalCtrl.dismiss(true);
      })

    }
    else
    {
      (await this.toastCtrl.create({
        message: "Responde los campos obligatorios",
        position: 'bottom',
        color: "danger",
        duration: 4000,
        buttons: ["Ok"],
      })).present();
    }
    
  }

}
