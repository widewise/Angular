import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-first',
  templateUrl: './first.component.html',
  styleUrls: ['./first.component.css']
})
export class FirstComponent implements OnInit {

  public name : string;
  public description: string;
  public price: number = 0;
  public category: Category;
  public isAvailable: boolean;

  constructor() { }

  ngOnInit(): void {
    this.name = "first";
    this.description = "first";
    this.price = 10;
    this.category = Category.Mobile;
    this.isAvailable = true;
  }
}

export enum Category
{
  Mobile = "Mobile",
  PC = "PC",
  Monitor = "Monitor",
  Network = "Network"
}
