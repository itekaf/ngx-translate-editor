import { Injectable } from '@angular/core';
import { NgxTranslateLint, IRulesConfig, ResultCliModel, ErrorTypes  } from 'ngx-translate-lint';
import  * as NodePath from 'path';

@Injectable({
  providedIn: 'root'
})
export class NgxTranslateLintService {
  public viewPath: string;
  public languagesPath: string;

  constructor() {}

  public run(viewsPath: string, languagesPath: string) {
/*    const viewsPathCorrect: string = './src/app/!**!/!*.{html,ts}';
    const languagesPathCorrect: string = './src/assets/i18n/!*.json';*/
    const ignoredLanguagesPath: string = "";
    const ruleConfig: IRulesConfig = {
      keysOnViews: ErrorTypes.error,
      zombieKeys: ErrorTypes.warning,
      misprint: ErrorTypes.warning,
      maxWarning: 0,
      misprintCoefficient: 0.9,
      ignoredKeys:  []
    };

    const ngxTranslateLint = new NgxTranslateLint(viewsPath, languagesPath, ignoredLanguagesPath, ruleConfig)
    const resultLint: ResultCliModel = ngxTranslateLint.lint();
    console.log(resultLint);
    return resultLint;
  }
}
