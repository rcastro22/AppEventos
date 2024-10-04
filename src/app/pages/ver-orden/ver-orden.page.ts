import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { url_services } from 'src/app/config/url.services';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';

@Component({
  selector: 'app-ver-orden',
  templateUrl: './ver-orden.page.html',
  styleUrls: ['./ver-orden.page.scss'],
})
export class VerOrdenPage implements OnInit {

  basepath = url_services
  orden:any = [];
  /* pdfSrc:string = "https://betaeventos.galileo.edu/api/verOrdenPago?TOKEN=ya29.a0AcM612xFBE1iYlnX1Bk2PyT_-H9BvMWUZNrrTq9LOb_8OTOEPduOmM8E4wh7Ye8_M6vVnKjAepRdZ9OxKohFy6FclpBhh3BmvqCCWPCT9X4lL5bsN1buh_kVjPTgsgvIDdYEHHqwUBc2DOK-L7MIymaJxZbbGHHz72saCgYKAVwSARMSFQHGX2Mi6tlWLNXYSYyAHnYSKkZxNA0170&TIPO=google&ORDENDEPAGO=382502322"; */
  /* pdfSrc:string = "https://vadimdez.github.io/ng2-pdf-viewer/assets/pdf-test.pdf"; */
  pdfSrc:string = "";

  constructor(
    private _up:UsuarioService,
    private router: Router,
    public modalCtrl: ModalController
  ) { }

  ngOnInit() {
    if(this.router.getCurrentNavigation()?.extras.state){
      this.orden = this.router.getCurrentNavigation()?.extras.state!['orden'];
    }

    this.pdfSrc = `${this.basepath}verOrdenPago?TOKEN=${this._up.credenciales.accessToken!}&TIPO=${this._up.credenciales.providerId!}&ORDENDEPAGO=${this.orden}`;
    
  }

}
