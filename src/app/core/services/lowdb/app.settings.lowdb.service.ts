import { Injectable } from "@angular/core";
import { LowdbService } from './lowdb.service';
import { ITableDatabase } from "../../interfaces";

import { AppSettingsModel } from "app/core/models";
import {LanguagesShortEnum} from "../../enum";

const defaultObject: ITableDatabase = {
  main: [],
  settings: {
    language: LanguagesShortEnum.en,
  }
};

@Injectable({
  providedIn: 'root'
})
export class AppSettingsLowdbService {
  public databaseName: string = 'settings';
  public defaultObject: ITableDatabase = defaultObject;

  constructor(
    private lowdbService: LowdbService,
  ){}

  public init() {
    this.connect();
  }
  public connect() {
    return this.lowdbService.connect(this.databaseName, this.defaultObject);
  }

  public getSettings(): AppSettingsModel {
    return this.connect().get('settings').value()
  }

  public setSettings(settings: AppSettingsModel) {
    this.connect().set('settings', settings).write();
  }
}
