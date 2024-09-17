import { inject, Injectable } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { UsuarioService } from '../services/usuario/usuario.service';


@Injectable({
  providedIn: 'root'
})
class PermissionsService {
  constructor(
    private _up:UsuarioService
  ){}
  async canActivate(): Promise<boolean> {
    if(!this._up.logueado){
      await this._up.valida_login(document.querySelector('ion-page'),true)
    }
    return this._up.logueado;
  }
}

export const authGuard: CanActivateFn = (route, state) => {
  
  return inject(PermissionsService).canActivate();
  //return true;
};
