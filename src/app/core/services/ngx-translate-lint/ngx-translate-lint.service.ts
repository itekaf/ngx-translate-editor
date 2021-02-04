import {Injectable} from '@angular/core';
import {
  ErrorTypes,
  IRulesConfig,
  KeyModelWithLanguages,
  LanguagesModel,
  NgxTranslateLint,
  ResultCliModel
} from 'ngx-translate-lint';
import {ProjectLintingModel} from "../../models";
import {sortedUniqBy} from 'lodash';
import {ResultErrorModel} from "ngx-translate-lint/dist/src/core/models/results/ResultErrorModel";

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

  public ignoredLanguagesPath = '';
  constructor() {}

  public run(viewsPath: string, languagesPath: string, config: ProjectLintingModel | undefined): ResultCliModel {
    const lintingConfig: IRulesConfig = {
      ...this.lintConfig,
    };

    if (config) {
      lintingConfig.zombieKeys = config.zombies;
      lintingConfig.keysOnViews = config.views;
    }

    const ngxTranslateLint = new NgxTranslateLint(viewsPath, languagesPath, this.ignoredLanguagesPath, lintingConfig);
    const result: ResultCliModel = ngxTranslateLint.lint();
    result.errors = sortedUniqBy(result.errors, (x: ResultErrorModel) => x.value);
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
