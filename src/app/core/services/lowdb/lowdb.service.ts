import { Injectable } from '@angular/core';
import FileSync from 'lowdb/adapters/FileSync';
import lowdb from 'lowdb'
import * as path from "path";
import { ElectronService } from '..';
import { ITableDatabase } from './../../interfaces';


@Injectable({
  providedIn: 'root'
})
export class LowdbService {
  public databaseFolder: string = 'database';
  public databaseExtension: string = 'json';

  constructor(
    private electronService: ElectronService,
  ) {  }

  public connect(databaseName: string, defaultObject: ITableDatabase) {
    if (!this.electronService.fs.existsSync(this.databaseFolder)) {
      this.electronService.fs.mkdirSync(this.databaseFolder);
    }
    const dbFile = path.join(this.databaseFolder, databaseName);
    const exist = this.electronService.fs.existsSync(dbFile);
    const adapter = new FileSync(dbFile);
    const db = lowdb(adapter);
    if (!exist) {
      db.defaults(defaultObject).write();
    }
    return db;
  }
}
