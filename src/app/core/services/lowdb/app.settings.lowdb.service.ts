import { Injectable } from "@angular/core";
import { LowdbService } from './lowdb.service';
import { TableDatabaseInterface } from "../../interfaces";

import { AppSettingsModel } from "app/core/models";
import {LanguagesShortEnum} from "../../enum";

const defaultObject: TableDatabaseInterface = {
  main: [],
  settings: {
    language: LanguagesShortEnum.en,
  }
};

@Injectable({
  providedIn: 'root'
})
export class AppSettingsLowdbService {
  public databaseName = 'settings';
  public defaultObject: TableDatabaseInterface = defaultObject;

  constructor(
    private lowdbService: LowdbService,
  ){}

  public init(): void {
    this.connect();
  }
  public connect(): any {
    return this.lowdbService.connect(this.databaseName, this.defaultObject);
  }

  public getSettings(): AppSettingsModel {
    return this.connect().get('settings').value();
  }

  public setSettings(settings: AppSettingsModel): void {
    this.connect().set('settings', settings).write();
  }
}
