import { Component, OnInit } from '@angular/core';
import { NgbTabChangeEvent } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-detail-travel',
  templateUrl: './detail-travel.component.html',
  styleUrls: ['./detail-travel.component.scss']
})
export class DetailTravelComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  onTabChange(event: NgbTabChangeEvent) {
    console.log(event.nextId)
  }
}
