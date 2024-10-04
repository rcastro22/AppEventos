import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card-event',
  templateUrl: './card-event.component.html',
  styleUrls: ['./card-event.component.scss'],
})
export class CardEventComponent  implements OnInit {

  @Input() evento:any;

  constructor(
    public router: Router,
  ) { }

  ngOnInit() {}

}
