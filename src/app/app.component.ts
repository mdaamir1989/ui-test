import { Component, ViewChild, ComponentRef, ComponentFactory, ComponentFactoryResolver, ViewContainerRef, OnInit } from '@angular/core';
import { ButtonComponent } from './button/button.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'ui-test-dynamic';

  // Keep track of list of generated components for removal purposes
  components = [];

  @ViewChild('component1', { static: true, read: ViewContainerRef }) container1: ViewContainerRef;
  @ViewChild('component2', {static: true, read: ViewContainerRef }) container2: ViewContainerRef;
  @ViewChild('component3', {static: true, read: ViewContainerRef }) container3: ViewContainerRef;
  @ViewChild('component4', {static: true, read: ViewContainerRef }) container4: ViewContainerRef;
  componentRef: ComponentRef<any>;

  constructor(private resolver: ComponentFactoryResolver) { }

  ngOnInit() {
    console.log('OnInit called');
    this.createComponent(this.container1, 1);
    this.createComponent(this.container2, 2);
    this.createComponent(this.container3, 3);
    this.createComponent(this.container4, 4);
  }

  createComponent(container: ViewContainerRef, type) {
    container.clear();
    const factory: ComponentFactory<any> = this.resolver.resolveComponentFactory(ButtonComponent);
    this.componentRef = container.createComponent(factory);
    this.componentRef.instance.type = type;

    this.components.push(this.componentRef);

    this.componentRef.instance.componentType.subscribe(event => {
      console.log('Event' + event);

      const comp = this.components[event];
      const componentIndex = this.components.indexOf(comp);

      this.removeComponent(event);

      console.log('Component Index is ', componentIndex);
    });
  }

  removeComponent(componentIndexTobeRemoved) {
    // Find the component
    const comp = this.components[componentIndexTobeRemoved];
    const componentIndex = this.components.indexOf(comp);

    if (componentIndex !== -1) {
      // Remove component from view

      switch (componentIndex) {
        case 0:
          this.container1.remove(this.container1.indexOf(comp));
          this.container1.clear();
          comp.destroy();
          break;
        case 1:
          this.container2.remove(this.container2.indexOf(comp));
          this.container2.clear();
          comp.destroy();
          break;
        case 2:
          this.container3.remove(this.container3.indexOf(comp));
          this.container3.clear();
          comp.destroy();
          break;
        case 3:
          this.container4.remove(this.container4.indexOf(comp));
          this.container4.clear();
          comp.destroy();
          break;
        default:
          break;
      }

      // this.components.splice(componentIndex, 1);
    }
  }
}
