import { Component, OnInit } from '@angular/core';
import { ElectronService } from './core/services';
import { TranslateService } from '@ngx-translate/core';
import { AppConfig } from '../environments/environment';
import { LanguagesShortEnum } from "./core/enum";
import {AppSettingsModel} from "./core/models";
import {AppSettingsLowdbService} from "./core/services/lowdb/app.settings.lowdb.service";
import {ProjectLowdbService} from "./core/services/lowdb/project.lowdb.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(
    private projectLowdbService: ProjectLowdbService,
    private appSettingsLowdbService: AppSettingsLowdbService,
    private translateService: TranslateService,
    public electronService: ElectronService,
    private translate: TranslateService
  ) {
    translate.setDefaultLang('en');
    console.log('AppConfig', AppConfig);

    if (electronService.isElectron) {
      console.log(process.env);
      console.log('Mode electron');
      console.log('Electron ipcRenderer', electronService.ipcRenderer);
      console.log('NodeJS childProcess', electronService.childProcess);
    } else {
      console.log('Mode web');
    }
  }

  public ngOnInit(): void {
    this.initDatabase();
    this.initTranslate();
  }

  private initDatabase(): void {
    this.projectLowdbService.init();
    this.appSettingsLowdbService.init();
  }

  private initTranslate(): void {
    this.translateService.setDefaultLang(LanguagesShortEnum.en);
    this.translateService.addLangs([LanguagesShortEnum.en, LanguagesShortEnum.ru]);

    const defaultSettings: AppSettingsModel = this.appSettingsLowdbService.getSettings();
    this.translateService.use(defaultSettings.language);
  }
}
