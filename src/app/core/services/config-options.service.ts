import { Injectable } from '@angular/core';
import { ConfigOptionsModel } from '../models/config-options.model';

@Injectable({
  providedIn: 'root'
})
export class ConfigOptionsService {

  private options: ConfigOptionsModel;

  constructor() {
    this.options = new ConfigOptionsModel(0, null, null);
  }

  getOptions(): ConfigOptionsModel {
    return this.options;
  }

  setOptions(args: Partial<ConfigOptionsModel>) {
    this.options = {...this.options, ...args};
  }
}
