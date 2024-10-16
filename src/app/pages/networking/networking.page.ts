import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';

@Component({
  selector: 'app-networking',
  templateUrl: './networking.page.html',
  styleUrls: ['./networking.page.scss'],
})
export class NetworkingPage implements OnInit {

  valor:string = "";
  showDataShare = false;
  dataShare = {
    telefono: true,
    email: true,
    lugar_trabajo: true
  };
  dataShareGenerated = {
    telefono: "",
    email: "",
    lugar_trabajo: ""
  }

  constructor(
    public _up:UsuarioService,
  ) { }

  ngOnInit() {
    this.dataShare = this._up.networking
    this.changeDataShare()
    this.cambiaValor();
  }

  cambiaValor() {
    try {
      this.valor = `BEGIN:VCARD
  VERSION:3.0
  N:${this.titleCase(this._up.perfil.nombres)} ${this.titleCase(this._up.perfil.apellidos)}
  FN:${this._up.perfil.nombres} ${this._up.perfil.apellidos}
  ORG:${this.dataShareGenerated.lugar_trabajo}
  EMAIL:${this.dataShareGenerated.email}
  TEL;TYPE=voice,home,pref:${this.dataShareGenerated.telefono}
  END:VCARD
  `;  
    } catch (error) {
      console.log("Error en cambiaValor");
      console.log(error);
      
    }
  }

  titleCase(str:string) {
    let str2 = str.toLowerCase().split(' ');
    for (var i = 0; i < str2.length; i++) {
      str2[i] = str2[i].charAt(0).toUpperCase() + str2[i].slice(1);
    }
    return str2.join(' ');
  }

  changeDataShare() {
    try {
      const fields = ['telefono', 'email', 'lugar_trabajo'] as const;
      fields.forEach(field => {
        if (this.dataShare[field]) {
          this.dataShareGenerated[field] = this._up.perfil[field] ?? '';
        } else {
          this.dataShareGenerated[field] = '';
        }
      });

    } catch (error) {
      console.log("Error en changeDataShare");
      console.log(error);
      this._up.networking = {
        telefono: true,
        email: true,
        lugar_trabajo: true
      };
      this.dataShare = this._up.networking;
    }

    this.cambiaValor();
    this._up.guardar_storage();
  }

}
