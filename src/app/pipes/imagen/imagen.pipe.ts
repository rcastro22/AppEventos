import { Pipe, PipeTransform } from '@angular/core';
import { url_images } from '../../config/url.services';
import { DomSanitizer } from '@angular/platform-browser';

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


@Pipe({
  name: 'imagensvg',
  standalone: true,
})
export class ImagenSvgPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}

  transform(html: string) {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }
}
