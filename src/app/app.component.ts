import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  @ViewChild('appTitle') titleField: ElementRef<HTMLInputElement>;
  
  title = 'shop';
  ngAfterViewInit() {
    this.titleField.nativeElement.textContent = 'Shop title';
  }
}
