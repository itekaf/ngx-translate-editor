import { Injectable } from '@angular/core';

// If you import a module but never use any of the imported values other than as TypeScript types,
// the resulting javascript file will look as if you never imported the module at all.
import * as fs from 'fs';
import { ElectronService } from './electron.service';

@Injectable({
  providedIn: 'root'
})
export class FsService {
  fs: typeof fs;


  constructor(
    private electronService: ElectronService
  ) {
    // Conditional imports
    this.fs = this.electronService.fs;
  }
}
