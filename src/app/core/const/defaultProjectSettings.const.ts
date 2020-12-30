import {ProjectMainSettingModel} from "../models";
import {ErrorTypes} from "ngx-translate-lint";
import {TranslateFileFormatEnum} from "../enum";

export const defaultProjectSettings: ProjectMainSettingModel = {
  linting: {
    views: ErrorTypes.error,
    zombies: ErrorTypes.warning
  },
  settings: {
    translateFileFormat: TranslateFileFormatEnum.delimiter
  }
};
