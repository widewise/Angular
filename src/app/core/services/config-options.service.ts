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

  setOptions(args: any) {
    if("id" in args)
    {
      this.options.id = args.id;
    }
    if("login" in args)
    {
      this.options.login = args.login;
    }
    if("email" in args)
    {
      this.options.email = args.email;
    }
  }
}