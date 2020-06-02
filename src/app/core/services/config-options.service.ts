import { Injectable, Inject, forwardRef } from '@angular/core';
import { ConfigOptionsModel } from '../models/config-options.model';
import { LocalStorageService } from './local-storage.service';
import { Observable, of } from 'rxjs';
import { retry, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ConfigOptionsService {
  private configOptionsKey = 'ConfigOptions';
  private localStotageService: LocalStorageService;

  constructor(
    @Inject(forwardRef(() => LocalStorageService)) localStotageService: LocalStorageService,
    private http: HttpClient
  ) {
    this.localStotageService = localStotageService;
  }

  getOptions(): Observable<ConfigOptionsModel> {
    const options = this.localStotageService.getItem(this.configOptionsKey) as ConfigOptionsModel;
    console.log('options: ' + options);
    if (options)
    {
      return of(options);
    }

    const observer = {
      next: val => {
        this.localStotageService.setItem(this.configOptionsKey, val);
        console.log(`Setted options from app-settings.json: ${val}`);
      },
      error: val => {
        console.log(`${val}: Retried 2 times then set default options!`);
        this.localStotageService.setItem(this.configOptionsKey, new ConfigOptionsModel(0, 'default_login', 'default_email'));
      }
    };

    const opt = this.http
    .get<ConfigOptionsModel>('assets/app-settings.json')
    .pipe(
      retry(2)
    );
    opt.subscribe(observer);

    return opt;
  }

  setOptions(args: Partial<ConfigOptionsModel>) {
    this.localStotageService.setItem(this.configOptionsKey, args);
  }

  clearOptions(){
    this.localStotageService.removeItem(this.configOptionsKey);
  }
}
