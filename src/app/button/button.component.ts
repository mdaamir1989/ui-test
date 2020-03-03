import { Component, OnInit, EventEmitter, Output, Input, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent implements OnInit,OnDestroy {

  @Input() type;
  @Output() componentType = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

  removeComponent(comp) {
    console.log('Component removed');
    this.componentType.emit(comp);
  }

  ngOnDestroy() {
    console.log('On destroy called');
  }

}
