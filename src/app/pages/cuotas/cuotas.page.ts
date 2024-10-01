import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { CarritoService } from 'src/app/services/carrito/carrito.service';

@Component({
  selector: 'app-cuotas',
  templateUrl: './cuotas.page.html',
  styleUrls: ['./cuotas.page.scss'],
})
export class CuotasPage implements OnInit {

  cuotas:any = [];
  cuotasMostrar:number = 0;
  cuotasPagar:number = 0;
  valorRango:any;
  minimo:number = 0;
  total_pagar:number = 0;
  mostrarRango:boolean = false;

  constructor(
    public _cp:CarritoService,
    public router: Router,
    private navCtrl:NavController
  ) { }

  ngOnInit() {
    if(this.router.getCurrentNavigation()?.extras.state){
      this.cuotas = this.router.getCurrentNavigation()?.extras.state!['cuotas'];
    }    

    let conteo = 0;
    let conteoCuotasMostrar = 0;
    this.total_pagar = 0;
    this.cuotasPagar = 0;
    this.cuotas["Fechas"].forEach((element:any) => {
      if(element.Obligatorio == 1){
        conteo += 1;
        this.total_pagar += parseFloat(element.Montoxcuota);
      }
      if(element.Pagada == 1){
        conteoCuotasMostrar++;
      }
    });
    this.cuotasMostrar = this.cuotas["Cantcuota"]-conteoCuotasMostrar;
    
    if(this.cuotasMostrar == 1){
      this.mostrarRango = true;
    }
    this.total_pagar = parseFloat(parseFloat(this.total_pagar.toString()).toFixed(2));
    if(conteo == 0){
      this.cuotasPagar = 1;
      this.minimo = 1;
      this.valorRango = 1
      this.updateResults();
    }else{
      this.cuotasPagar = conteo;
      this.minimo = conteo;
      this.valorRango = conteo;
    }
    console.log(this.cuotas)
  }

  updateResults(){
    let conteo = 0;
    this.total_pagar = 0;
    this.cuotasPagar = 0;
    this.cuotas["Fechas"].forEach((element:any) => {
      if(element.Pagada != 1){
        conteo += 1;
        if(conteo <= this.valorRango){
          element.Obligatorio = 1;
          this.total_pagar += parseFloat(element.Montoxcuota);
          this.cuotasPagar += 1;
        }
        else{
          if(conteo <= this.minimo){
            element.Obligatorio = 1;
            this.total_pagar += parseFloat(element.Montoxcuota);
            this.cuotasPagar += 1;
          }else{
            element.Obligatorio = 0;
          }        
        }
      }
    });    
  }

  pagar(){
    this._cp.cantcuotas = this.cuotas["Cantcuota"];
    this._cp.cuotaspagar = this.cuotasPagar;
    this._cp.montocuotas = this.total_pagar;
    this.navCtrl.navigateForward("pago");
  }

}
