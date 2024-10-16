import { Component, OnInit } from '@angular/core';
import { CarritoService } from 'src/app/services/carrito/carrito.service';
import { PerfilService } from 'src/app/services/perfil/perfil.service';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  profile:string = 'GeneralInfo';

  public regUser = {
    carne:"",
    nombres:"",
    apellidos: "",
    tipoDoc: "0",
    paisDoc: "",
    documento: "",
    telefono: "",
    nacimiento: "1990-01-01",
    nacionalidad: "62",
    comparteDatos: false,
    lugarTrabajo: "",
    puesto: "",
    telefonoTrabajo: "",
  }

  public estPerfil = {
    codigo: "", fechanac: ""
  }
  public docPerfil = {
    codigo: "", fechanac: ""
  }
  public admPerfil = {
    codigo: "", fechanac: ""
  }

  public tipodocumento = [
    {iddoc: "0", documento: "Sin Documento"},
    {iddoc: "1", documento: "DPI"},
    {iddoc: "2", documento: "Pasaporte"},
    {iddoc: "3", documento: "Menor"}
  ]

  labelDocumento:string = "";

  constructor(
    public _cp:CarritoService,
    public _up:UsuarioService,
    public _pp:PerfilService
  ) { 
    
  }

  async ngOnInit() {
    await this._pp.cargar_info_perfil();
    this.llena_local();
  }

  llena_local(){
    this.regUser.carne = this._up.perfil.id_galileo;
    this.regUser.nombres = this._up.perfil.nombres;
    this.regUser.apellidos = this._up.perfil.apellidos;
    this.regUser.telefono = this._up.perfil.telefono;
    //this.regUser.nacimiento = this.datePipe.transform(new Date(this._up.perfil.fechanac),"yyyy-MM-dd");
    this.regUser.nacimiento = new Date(this._up.perfil.fechanac).toISOString();
    this.regUser.nacionalidad = this._up.perfil.nacionalidad;
    this.regUser.comparteDatos = (this._up.perfil.compartir ? (this._up.perfil.compartir == "checked" ? true : false) : false);
    this.regUser.lugarTrabajo = (this._up.perfil.lugar_trabajo == null ? "" : this._up.perfil.lugar_trabajo);
    this.regUser.puesto = (this._up.perfil.puesto == null ? "" : this._up.perfil.puesto);
    this.regUser.telefonoTrabajo = (this._up.perfil.telefono_trabajo == null ? "" : this._up.perfil.telefono_trabajo);

    if(!this._up.perfil.dpi && !this._up.perfil.pasaporte && !this._up.perfil.es_menor){
      this.regUser.tipoDoc = "0";
    }
    if(this._up.perfil.dpi){
      this.regUser.tipoDoc = "1";
      this.regUser.paisDoc = this._up.perfil.dpi_pais;
      this.regUser.documento = this._up.perfil.dpi;
      this.labelDocumento = "DPI";
    }
    if(this._up.perfil.pasaporte){
      this.regUser.tipoDoc = "2";
      this.regUser.paisDoc = this._up.perfil.pas_pais;
      this.regUser.documento = this._up.perfil.pasaporte;
      this.labelDocumento = "Pasaporte";
    }
    if(this._up.perfil.es_menor){
      this.regUser.tipoDoc = "3";
    }

    //this.docPerfil.fechanac = moment(new Date(this._up.perfil.fechanac)).format("YYYY-MM-DD");
    //this.admPerfil.fechanac = moment(new Date(this._up.perfil.fechanac)).format("YYYY-MM-DD");
    //this.estPerfil.fechanac = moment(new Date(this._up.perfil.fechanac)).format("YYYY-MM-DD");
    this.docPerfil.fechanac = new Date(this._up.perfil.fechanac).toISOString();
    this.admPerfil.fechanac = new Date(this._up.perfil.fechanac).toISOString();
    this.estPerfil.fechanac = new Date(this._up.perfil.fechanac).toISOString();
    
  }

  cambia_label(event:any){
  
        switch (event) {
          case "1":this.labelDocumento = "DPI";
            break;
          case "2":this.labelDocumento = "Pasaporte";
            break;
          default:this.labelDocumento = "";
            break;
        }
        this.regUser.documento = "";
        
  }

  actualizar_cuenta(){
    this._pp.actualiza_perfil(this.regUser);
  }


}
