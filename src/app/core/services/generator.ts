import { Injectable } from '@angular/core';

@Injectable()
export class GeneratorService {

  constructor() { }

  private digitsCharCodes: any = {
    [Symbol.iterator]: this.generateIterator(48, 57)
  };

  private lowerCaseLettersCharCodes: any = {
    [Symbol.iterator]: this.generateIterator(97, 122)
  };

  private upperCaseLettersCharCodes: any = {
    [Symbol.iterator]: this.generateIterator(65, 90)
  };

  private charCodes = [
    ...Array.from(this.lowerCaseLettersCharCodes),
    ...Array.from(this.upperCaseLettersCharCodes),
    ...Array.from(this.digitsCharCodes)
  ];

  private generateIterator(from, to) {
    let cur = from;
    const last = to;

    return () => ({
      next() {
        if (cur <= last) {
          return { done: false, value: cur++ };
        } 
        else 
        {
          return { done: true };
        }
      }
    });
  }

  getString(n: number): string {
    let randomString = '';

    for ( let i = 0; i < length; i++ ) {
      const index: number = (Math.floor(Math.random() * this.charCodes.length));
      const charCode: any = this.charCodes[index];
      const randomCharacter = String.fromCharCode(charCode);
      randomString += randomCharacter;
    }

    return randomString;
  }
}