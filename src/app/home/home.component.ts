import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BaseComponent } from 'app/core/components/baseComponent';
import { NgxTranslateLint, IRulesConfig } from 'ngx-translate-lint';
const remote = window.require('electron').remote;
const electronFs = remote.require('fs');

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent extends  BaseComponent implements OnInit {

  public languages: string[] = [];

  constructor(
    private cdRef: ChangeDetectorRef,
    private router: Router
  ) {
    super(cdRef);
  }

  ngOnInit(): void { }

  OpenProject() {
    remote.dialog.showOpenDialog({ properties: ['openDirectory']})
      .then(result => {
        const folders: string[] = result.filePaths;
        if(folders && folders[0]) {
          this.languages = HomeComponent.readDir(folders[0]);
          this.languages.forEach((fileName) => {
            HomeComponent.readFile(folders[0] + '\\' + fileName);
          });
          this.cdRef.markForCheck();
        }
      }).catch(err => {
        console.log(err);
      });
  }

  static readFile(filePath: string): void {
    const fileData = electronFs.readFile(filePath, (error, file) => {
      console.log(filePath);
      const keys = JSON.parse(file);
      console.log(keys);
    });

  }

  static readDir(folderPath:string): string[] {
    try {
      const languages: string[] = [];
      const dir = electronFs.readdirSync(folderPath);
      for(const filePath of dir) {
        if(filePath.match('.json')) {
          languages.push(filePath);
        }
      }
      return languages;
    } catch (error) {
      console.log(error);
    }
  }

  static runLint(viewPath: string, languagesPath: string, config: IRulesConfig) {
    const ngxTranslateLint = new NgxTranslateLint(viewPath, languagesPath, '', config);
    const resultLint =  ngxTranslateLint.lint();
    console.log(resultLint);
  }
}
