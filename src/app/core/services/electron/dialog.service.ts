import { Injectable } from '@angular/core';

// If you import a module but never use any of the imported values other than as TypeScript types,
// the resulting javascript file will look as if you never imported the module at all.

import { ElectronService } from './electron.service';
import { remote } from 'electron';

@Injectable({
  providedIn: 'root'
})
export class DialogService {
  remote: typeof remote;


  constructor(
    private electronService: ElectronService
  ) {
    // Conditional imports
    this.remote = this.electronService.remote;
  }
}
