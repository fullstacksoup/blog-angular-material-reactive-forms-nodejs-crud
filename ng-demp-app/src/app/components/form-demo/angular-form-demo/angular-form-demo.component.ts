import { Component, OnInit } from '@angular/core';
import { MatSliderModule } from '@angular/material/slider';
@Component({
  selector: 'app-angular-form-demo',
  templateUrl: './angular-form-demo.component.html',
  styleUrls: ['./angular-form-demo.component.scss']
})
export class AngularFormDemoComponent implements OnInit {
  value = 'Clear me';
  
  constructor() { }

  ngOnInit(): void {
  }

}
