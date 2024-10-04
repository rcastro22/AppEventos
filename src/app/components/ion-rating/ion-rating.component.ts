import { Component, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-ion-rating',
  templateUrl: './ion-rating.component.html',
  styleUrls: ['./ion-rating.component.scss'],
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: IonRatingComponent, multi: true}
  ]
})
export class IonRatingComponent  implements ControlValueAccessor, OnInit {

  @Input() stars:string[] = [];
  @Input() numStars:number = 5;
  value:number = 0;

  ngOnInit() {
    this.calc();
  }

  calc(){
    this.stars = [];
    let tmp = this.value;
    for (let i = 0; i < this.numStars; i++, tmp--) {
      if(tmp >= 1){
        this.stars.push("star");
      }else if(tmp > 0 && tmp < 1){
        this.stars.push("star-half");
      }else{
        this.stars.push("star-outline");
      }
    }
  }

  private onChange!: (value: number) => void;

  starClicked(index:any){
    this.value = index + 1;
    this.onChange(this.value);
    this.calc();
  }

  selectColor(color: number) {
    this.value = color;
    this.onChange(color);
  }

  writeValue(value: number) {
    this.value = value;
  }

  registerOnChange(onChange: (value: number) => void) {
    this.onChange = onChange;
  }

  registerOnTouched() {}

}
