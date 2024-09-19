import { Component, OnInit } from '@angular/core';
import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';
import { ModalController } from '@ionic/angular';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';
import { Login } from 'src/app/interfaces/Login';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(
    private _up:UsuarioService,
    private modalCtrl:ModalController,
  ) { }

  ngOnInit() {
  }

  async signInWithGoogle(){
    if(await this._up.loginGoogle()){
      this.modalCtrl.dismiss(false);
    }
  }

  close_page() {
    return this.modalCtrl.dismiss(false);
  }

}
