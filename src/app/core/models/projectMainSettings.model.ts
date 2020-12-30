import { ProjectLintingModel } from "./projectLinting.model";
import { ProjectSettingsModel } from "./projectSettings.model";

export class ProjectMainSettingModel {
  linting: ProjectLintingModel;
  settings: ProjectSettingsModel;
}
