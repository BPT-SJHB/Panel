import { Injectable } from '@angular/core';
import { ICryptographyService } from './cryptography.interface';
import SHA256 from 'crypto-js/sha256';

@Injectable({
  providedIn: 'root',
})
export class CryptographyService  implements ICryptographyService{
  constructor() {}

  public async SHA256(message: string): Promise<string> {
    const hashHex = SHA256(message).toString();
    return hashHex;
  }
}
