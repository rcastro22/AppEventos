import { Pipe, PipeTransform } from '@angular/core';
import { url_images } from '../../config/url.services';

@Pipe({
  name: 'imagen',
  standalone: true,
})
export class ImagenPipe implements PipeTransform {

  transform(Fotoevento: string) {
    return url_images + Fotoevento;
  }

}

@Pipe({
  name: 'imagenperfil',
  standalone: true,
})
export class ImagenPerfilPipe implements PipeTransform {

  transform(Foto: string) {
    if(Foto == "" || Foto == null){
      return "./assets/imgs/SinPerfil.png";  
    }
    else{
      return url_images + Foto;
    }
  }
}

@Pipe({
  name: 'imagenext',
  standalone: true,
})
export class ImagenExtPipe implements PipeTransform {

  transform(Foto: string) {
    if(Foto == "" || Foto == null){
      return "./assets/imgs/SinPerfil.png";  
    }
    else{
      return Foto;
    }
  }
}
