import { Injectable } from '@angular/core';
import {NgxTranslateLint, IRulesConfig, ResultCliModel, ErrorTypes, KeyModelWithLanguages, LanguagesModel} from 'ngx-translate-lint';
import {ProjectLintingModel} from "../../models";

@Injectable({
  providedIn: 'root'
})
export class NgxTranslateLintService {
  public lintConfig: IRulesConfig = {
    keysOnViews: ErrorTypes.error,
    zombieKeys: ErrorTypes.warning,
    misprint: ErrorTypes.warning,
    maxWarning: 0,
    misprintCoefficient: 0.9,
    ignoredKeys: [],
    ignoredMisprintKeys: [],
  };

  public ignoredLanguagesPath: string = '';
  constructor() {}

  public run(viewsPath: string, languagesPath: string, config: ProjectLintingModel | undefined): ResultCliModel {
    const lintingConfig: IRulesConfig = {
      ...this.lintConfig,
    }

    if (config) {
      lintingConfig.zombieKeys = config.zombies;
      lintingConfig.keysOnViews = config.views
    }

    const ngxTranslateLint = new NgxTranslateLint(viewsPath, languagesPath, this.ignoredLanguagesPath, lintingConfig);
    const result: ResultCliModel = ngxTranslateLint.lint();
    return result;
  }

  getLanguages(viewsPath: string, languagesPath: string): LanguagesModel[] {
    const ngxTranslateLint = new NgxTranslateLint(viewsPath, languagesPath, this.ignoredLanguagesPath, this.lintConfig);
    const result: LanguagesModel[] = ngxTranslateLint.getLanguages();
    return result;
  }

  getKeys(viewsPath: string, languagesPath: string): KeyModelWithLanguages[] {
    const ngxTranslateLint = new NgxTranslateLint(viewsPath, languagesPath, this.ignoredLanguagesPath, this.lintConfig);
    const result: KeyModelWithLanguages[] = ngxTranslateLint.getKeys();
    return result;
  }
}
