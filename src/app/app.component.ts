import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  // @ViewChild('appTitle') titleField: ElementRef<HTMLInputElement>;

  constructor(){}

  title = 'shop';
  ngAfterViewInit() {
    // this.titleField.nativeElement.textContent = 'Shop title';
  }

  // onActivate($event: any, routerOutlet: RouterOutlet) {
  //   console.log('Activated Component', $event, routerOutlet);
  // }

  // onDeactivate($event: any, routerOutlet: RouterOutlet) {
  //     console.log('Deactivated Component', $event, routerOutlet);
  // }
}
