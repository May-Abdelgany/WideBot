import { Injectable } from '@angular/core';
import * as CryptoTS from 'crypto-ts';
@Injectable({
  providedIn: 'root'
})
export class CryptoService {
   // Encrypt data and saved in local storage
  encryptionAES(data: string) {
    const ciphertext = CryptoTS.AES.encrypt(data, 'secret key 123');
    console.log(ciphertext.toString());
    localStorage.setItem('data', ciphertext.toString())
  }
 // get data from local storage and decrypt
  decryptionAES(data: string) {
    const bytes = CryptoTS.AES.decrypt(data, 'secret key 123');
    const plaintext = bytes.toString(CryptoTS.enc.Utf8);
    return plaintext;
  }
}
