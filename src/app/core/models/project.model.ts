import {LanguagesModel, ResultCliModel, KeyModelWithLanguages, ErrorTypes} from "ngx-translate-lint";
import { ProjectMainSettingModel } from "./projectMainSettings.model";

export class ProjectModel {
  public id: number;
  public name?: string;
  public path?: string;
  public viewPath?: string;
  public settings?: ProjectMainSettingModel;
  public keysModel?: KeyModelWithLanguages[];
  public lintResult?: ResultCliModel;
  public languagesPath?: string;
  public languagesModel?: LanguagesModel[];
}
