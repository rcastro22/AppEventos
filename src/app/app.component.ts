import { Component, NgZone } from '@angular/core';
import { isPlatform, MenuController, Platform } from '@ionic/angular';
import { register } from 'swiper/element/bundle';

import { TranslateModule, TranslateService } from '@ngx-translate/core';

import { UsuarioService } from './services/usuario/usuario.service';
import { CarritoService } from './services/carrito/carrito.service';

import { PAGES } from './config/pages.config';
import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';
import { addIcons } from 'ionicons';
import { Storage } from '@ionic/storage';
import { environment } from 'src/environments/environment.prod';
import { Router } from '@angular/router';
import { App, URLOpenListenerEvent } from '@capacitor/app';

register();

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  pages:any = PAGES;
  public appPages = [
    { title: 'Inbox', url: '/folder/inbox', icon: 'mail' },
    { title: 'Outbox', url: '/folder/outbox', icon: 'paper-plane' },
    { title: 'Favorites', url: '/folder/favorites', icon: 'heart' },
    { title: 'Archived', url: '/folder/archived', icon: 'archive' },
    { title: 'Trash', url: '/folder/trash', icon: 'trash' },
    { title: 'Spam', url: '/folder/spam', icon: 'warning' },
  ];
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
  constructor(
    public platform: Platform,
    public _up:UsuarioService,
    public _cp:CarritoService,
    private menuCtrl:MenuController,
    public translateService:TranslateService,
    private storage: Storage,
    private router: Router,
    private zone: NgZone
  ) {

    addIcons({
      "networking-outline": "assets/icon/mdi--human-greeting-proximity.svg",
      "networking-sharp": "assets/icon/mdi--human-greeting-proximity.svg",
      "network-sharp": "assets/icon/fluent--people-team-toolbox-20-filled.svg",
      "network-outline": "assets/icon/fluent--people-team-toolbox-20-regular.svg",
      "badge-outline": "assets/icon/badge-outline.svg",
      "badge-sharp": "assets/icon/badge-sharp.svg",
      "scan-qrcode-sharp": "assets/icon/scan-qrcode.svg",
      "scan-qrcode-outline": "assets/icon/scan-qrcode.svg",
    })
    console.log("Inicia");
    
    this.initializeApp();
    

    platform.ready().then(() => {
      this._up.pagesInit = PAGES;
      this._up.pages = PAGES.filter(page => {
        return page.show === true;
      });
    });    

  }

  async ngOnInit(){
    this._up.cargar_storage().then(() => {
      if(this._up.language != ""){
        this.translateService.use(this._up.language);
      }
    });
  }

  signIn(){
    this.menuCtrl.close();
    this._up.valida_login(document.querySelector('ion-page'));
  }

  signOut(){
    this._up.cerrar_sesion().then(()=>{
      console.log("Cerró Sesion");
    });
    this._cp.items = [];
    this._cp.asignados = [];
    this._cp.transmisiones = 0;
    this.menuCtrl.close();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      GoogleAuth.initialize({
        clientId: (isPlatform('ios')&&isPlatform('capacitor')) ? environment.iosClientId : environment.clientId,
        //clientId: environment.clientId,
        scopes: ['profile','email'],
        grantOfflineAccess: true,
      })
    });
    App.addListener('appUrlOpen', (event: URLOpenListenerEvent) => {
      this.zone.run(() => {
        console.log('App opened with URL: ' + event.url);
        const slug = event.url.split(".app").pop();
        if(slug){
          //this.router.navigate([event.url]);
          this.router.navigateByUrl(slug);
        }
      });
    });
  }
}
