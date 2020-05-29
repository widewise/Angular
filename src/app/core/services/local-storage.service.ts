import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }
  setItem(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify({val: value}));
  }

  getItem(key: string): any {
    return JSON.parse(localStorage.getItem(key))?.val;
  }

  removeItem(key: string) {
    localStorage.removeItem(key);
  }
}
