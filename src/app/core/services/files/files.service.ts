import {Injectable} from "@angular/core";
import {ElectronService} from "../electron/electron.service";
import {ProjectModel} from "../../models";
import {KeyModelWithLanguages, LanguagesModel, LanguagesModelWithKey} from "ngx-translate-lint";

@Injectable({
  providedIn: 'root'
})
export class FilesService {
  constructor(
    private electronService: ElectronService,
  ) {  }

  public saveFiles(project: ProjectModel): void {
        project.languagesModel.forEach((lang: LanguagesModel) => {
          const data = {};
          project.keysModel.forEach((key: KeyModelWithLanguages) => {
            if (key.languages) {
              key.languages.forEach((langWithKey: LanguagesModelWithKey) => {
                if (langWithKey.name === lang.name) {
                  data[key.name] = langWithKey.keyValue;
                }
              });
            }
          });
         this.electronService.fs.writeFileSync(lang.path, JSON.stringify(data, null, 4));
        });
  }
}
