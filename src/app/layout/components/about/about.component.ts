import { Component, Optional, Inject, OnInit } from '@angular/core';
import {
  ConfigOptionsService,
  ConstantsServiceToken,
  ConstantsService,
  GeneratorService,
  RandomString,
  GeneratorFactory
 } from '../../../core';
import { Observable } from 'rxjs';
import { ConfigOptionsModel } from 'src/app/core/models/config-options.model';

const constantService = new ConstantsService('Shop', '1.0');

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
  providers: [
    GeneratorService,
    { provide: ConstantsServiceToken, useValue: constantService },
    { provide: RandomString, useFactory:  GeneratorFactory(3), deps: [GeneratorService] }
  ]
})
export class AboutComponent implements OnInit{
  applicationName: string;
  version: string;
  options$: Observable<ConfigOptionsModel>;

  constructor(
    @Optional() private configOptionsService: ConfigOptionsService,
    @Inject(ConstantsServiceToken)@Optional() private constantsService: ConstantsService,
    @Inject(RandomString)@Optional() private randomString: string) {
      console.log(`RandomString = ${randomString}`);
    }
  ngOnInit(): void {
    this.applicationName = this.constantsService.App;
    this.version = this.constantsService.Ver;
    this.options$ = this.configOptionsService.getOptions();
  }

  onClearOptions(){
    this.configOptionsService.clearOptions();
  }
}
