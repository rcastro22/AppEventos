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
    /* GoogleAuth.refresh()
        .then((data) => {
            if (data.accessToken) {
                this.currentTokens = data;
            }
        })
        .catch((error) => {
            if (error.type === 'userLoggedOut') {
                this.signin()
            }
        }); 
    */
    console.log("logGoo");
    
    let googleUser = await GoogleAuth.signIn().then(res => {
      this._up.info_token(res.authentication.accessToken).subscribe(data => {

        const field = 'exp';
        // El valor viene en segundos, y se debe traslada a milisegundos
        const temp = data[field as keyof Object].toString();
        
        this._up.cargar_credenciales(
          res.name,
          res.email,
          res.imageUrl,
          res.id,
          "google",
          res.authentication.accessToken,
          //new Date().getTime() + parseInt(temp),
          parseInt(temp+"000"),
          res.id
        );
        this.signInWithEventos();
      })
    });

    console.log(googleUser);

    /*GoogleAuth.initialize({
      clientId: '213739652036-mihsbsqs8h3jrdam3ujkk3ufcbt66rrf.apps.googleusercontent.com',
      scopes: ['profile','email'],
      grantOfflineAccess: true,
    });
    let googleUser = await GoogleAuth.signIn();
    console.log(googleUser);*/
  }

  signInWithFacebook(){}

  signInWithEventos() {
    this._up.loginEventos()
    .then(async data => {
      let perfil = data as Login;
      console.log(data);
      //if(data["Perfil"] != null)
      if(perfil.Perfil != null){
        let dat = perfil.Perfil[0];
        if(dat){
          this._up.cargar_parfil(
            dat.Email,
            dat.Nombres,
            dat.Apellidos,
            dat.Telefono,
            dat.Nacionalidad,
            dat.Dpi,
            dat.Pasaporte,
            new Date(dat.Fechanac).toDateString(),
            dat.Pas_Pais,
            dat.Lugar_Trabajo,
            dat.Puesto,
            dat.Telefono_Trabajo,
            dat.Compartir,
            dat.Cambiardocumento,
            dat.Dpi_Pais,
            dat.Id_Galileo,
            dat.EsMenor);
        }
        this._up.guardar_storage();
        this.modalCtrl.dismiss(false);  
      }
    })
  }

  close_page() {
    return this.modalCtrl.dismiss(false);
  }

}
