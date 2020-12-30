import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ProjectModel } from 'app/core/models/project.model';
import { ElectronService } from 'app/core/services';
import { Router } from '@angular/router';
import * as NodePath from "path";
import {Form, FormControl, FormGroup} from '@angular/forms';
import { NestedTreeControl } from '@angular/cdk/tree';
import { ArrayDataSource } from '@angular/cdk/collections';
import { BehaviorSubject, of as observableOf } from 'rxjs';
import {IRulesConfig, KeyModel, KeyModelWithLanguages, LanguagesModelWithKey} from "ngx-translate-lint";
import {ProjectCreateDialogComponent} from "../project-create-dialog/project-create-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {ProjectCreateKeyDialogComponent} from "../project-create-key-dialog/project-create-key-dialog.component";
import {NgxTranslateLintService} from "../../../core/services/ngx-translate-lint/ngx-translate-lint.service";
import {ProjectLowdbService} from "../../../core/services/lowdb/project.lowdb.service";
import {ProjectMainSettingModel} from "../../../core/models";
import {$e} from "codelyzer/angular/styles/chars";
import {FilesService} from "../../../core/services/files/files.service";


@Component({
  selector: 'app-project-item',
  templateUrl: './project-item.component.html',
  styleUrls: ['./project-item.component.scss']
})
export class ProjectItemComponent implements OnInit {
  @Input() project: ProjectModel;
  @Output() removeProjectEmitter: EventEmitter<ProjectModel> = new EventEmitter<ProjectModel>();
  @Output() runProjectLintingEmitter: EventEmitter<ProjectModel> = new EventEmitter<ProjectModel>()
  @Output() saveProjectSettingsEmitter: EventEmitter<ProjectModel> = new EventEmitter<ProjectModel>();

  public projectItemKeysForm: FormGroup;
  public showFiller: boolean = false;

  constructor(
    private fileService: FilesService,
    private projectLowdbService: ProjectLowdbService,
    private ngxTranslateLintService: NgxTranslateLintService,
    public dialog: MatDialog,
  ) {}

  ngOnInit() {
    this.buildForm();
  }

  public editKeyAction(key: KeyModelWithLanguages) {

  }

  public removeKeyAction(key: KeyModelWithLanguages) {
    this.project.keysModel = this.project.keysModel.filter(x => x.name !== key.name);
  }

  public saveProjectLintingSettingsAction($event: ProjectMainSettingModel) {
    this.project.settings = $event;
    this.saveProjectSettingsEmitter.emit(this.project);
  }

  public removeProjectAction() {
    this.removeProjectEmitter.emit(this.project);
  }

  public openAddNewKeyDialogAction() {
    const keyModel = new KeyModelWithLanguages("", this.getProjectLanguages());
    const dialogRef = this.dialog.open(ProjectCreateKeyDialogComponent, {
      width: '550px',
      data: keyModel
    });

    dialogRef.afterClosed().subscribe((result: KeyModelWithLanguages) => {
      if (result && result.name) {
        const keyModel = new KeyModelWithLanguages(result.name, this.getProjectLanguages());
        this.project.keysModel.unshift(keyModel);
        keyModel.languages.forEach((lang, index) => {
          this.projectItemKeysForm.addControl(index + result.name, new FormControl(lang.keyValue || ""))
        })
      }
    });
  }

  public refreshProjectAction() {
    this.updateProject();
  }

  private getProjectLanguages() {
    return this.project.languagesModel.map((lang) => {
      return new LanguagesModelWithKey(lang.name, lang.path, "");
    });
  }

  public saveProjectAction() {
    this.fileService.saveFiles(this.project);
    this.updateProject();
  }

  private updateProject() {
    this.project.keysModel = this.ngxTranslateLintService.getKeys(this.project.viewPath, this.project.languagesPath);
    this.project.lintResult = this.ngxTranslateLintService.run(this.project.viewPath, this.project.languagesPath, this.project.settings.linting);
    this.project.languagesModel = this.ngxTranslateLintService.getLanguages(this.project.viewPath, this.project.languagesPath);
    this.projectLowdbService.updateProject(this.project);
  }

  private buildForm() {
    this.projectItemKeysForm = new FormGroup({});
    this.project.keysModel.forEach((key) => {
      key.languages.forEach((lang, index) => {
        this.projectItemKeysForm.addControl(index + key.name, new FormControl(lang.keyValue))
      })
    })
    this.projectItemKeysForm.valueChanges.subscribe((value) => {
      this.project.keysModel.forEach((key) => {
        key.languages.forEach((lang, index) => {
          lang.keyValue = value[index + key.name];
        })
      })
    })

  }
}
