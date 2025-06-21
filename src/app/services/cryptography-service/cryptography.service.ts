import { Injectable } from '@angular/core';
import SHA256 from 'crypto-js/sha256';

@Injectable({
  providedIn: 'root',
})
export class CryptographyService {
  public SHA256(message: string): string {
    return SHA256(message).toString();
  }
}
