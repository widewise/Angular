import { Component, Optional, Inject, OnInit } from '@angular/core';
import { LocalStorageService } from '../../core/services/local-storage.service';
import {
  ConfigOptionsService,
  ConstantsServiceToken,
  ConstantsService,
  GeneratorService,
  RandomString,
  GeneratorFactory
 } from '../../core';

const constantService = new ConstantsService('Shop', '1.0');

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
  providers: [
    GeneratorService,
    { provide: LocalStorageService, useClass: LocalStorageService },
    { provide: ConstantsServiceToken, useValue: constantService },
    { provide: RandomString, useFactory:  GeneratorFactory(3), deps: [GeneratorService] }
  ]
})
export class AboutComponent implements OnInit{
  applicationName: string;
  version: string;

  constructor(
    @Optional() private localStorageService: LocalStorageService,
    @Optional() private configOptionsService: ConfigOptionsService,
    @Inject(ConstantsServiceToken)@Optional() private constantsService: ConstantsService,
    @Inject(RandomString)@Optional() private randomString: string) {
      console.log(`RandomString = ${randomString}`);
    }
  ngOnInit(): void {
    this.applicationName = this.constantsService.App;
    this.version = this.constantsService.Ver;
  }
}
