import { Component, EventEmitter, Input, OnInit, Output, HostListener } from '@angular/core';
import { ProjectModel } from 'app/core/models/project.model';
import { FormControl, FormGroup} from '@angular/forms';
import {KeyModel, KeyModelWithLanguages, LanguagesModelWithKey} from "ngx-translate-lint";
import { MatDialog } from "@angular/material/dialog";
import { ProjectCreateKeyDialogComponent } from "../project-create-key-dialog/project-create-key-dialog.component";
import { NgxTranslateLintService } from "../../../core/services/ngx-translate-lint/ngx-translate-lint.service";
import { ProjectLowdbService } from "../../../core/services/lowdb/project.lowdb.service";
import { ProjectMainSettingModel } from "../../../core/models";
import { FilesService } from "../../../core/services/files/files.service";

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

  public showFiller = false;
  public projectKeys: KeyModelWithLanguages[]  = [];
  public projectItemKeysForm: FormGroup;
  public projectKeySearchControl: FormControl = new FormControl();

  constructor(
    private fileService: FilesService,
    private projectLowdbService: ProjectLowdbService,
    private ngxTranslateLintService: NgxTranslateLintService,
    public dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.initData();
    this.buildForm();
  }

  @HostListener('window:keyup', ['$event'])
  onKeyPress($event: KeyboardEvent) {
    if (($event.ctrlKey || $event.metaKey) && $event.keyCode == 75) {
      this.openAddNewKeyDialogAction()
    }
    if (($event.ctrlKey || $event.metaKey) && $event.keyCode == 83) {
      this.saveProjectAction();
    }
    if (($event.ctrlKey || $event.metaKey) && $event.keyCode == 82) {
      this.refreshProjectAction();
    }
  }

  public initData() {
    this.projectKeys = this.project.keysModel;
  }

  public removeKeyAction(key: KeyModelWithLanguages): void {
    this.project.keysModel = this.project.keysModel.filter(x => x.name !== key.name);
  }

  public saveProjectLintingSettingsAction($event: ProjectMainSettingModel): void {
    this.project.settings = $event;
    this.saveProjectSettingsEmitter.emit(this.project);
  }

  public removeProjectAction(): void {
    this.removeProjectEmitter.emit(this.project);
  }

  public openAddNewKeyDialogAction(): void {
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
          this.projectItemKeysForm.addControl(index + result.name, new FormControl(lang.keyValue || ""));
        });
      }
    });
  }

  public refreshProjectAction(): void {
    this.updateProject();
  }

  private getProjectLanguages(): LanguagesModelWithKey[] {
    return this.project.languagesModel.map((lang) => {
      return new LanguagesModelWithKey(lang.name, lang.path, "");
    });
  }

  public saveProjectAction(): void {
    this.fileService.saveFiles(this.project);
    this.updateProject();
  }

  private updateProject(): void {
    this.project.keysModel = this.ngxTranslateLintService.getKeys(this.project.viewPath, this.project.languagesPath);
    this.project.lintResult = this.ngxTranslateLintService.run(this.project.viewPath, this.project.languagesPath, this.project.settings.linting);
    this.project.languagesModel = this.ngxTranslateLintService.getLanguages(this.project.viewPath, this.project.languagesPath);
    this.projectLowdbService.updateProject(this.project);
  }

  private buildForm(): void {
    this.projectItemKeysForm = new FormGroup({});
    this.project.keysModel.forEach((key) => {
      key.languages.forEach((lang, index) => {
        this.projectItemKeysForm.addControl(index + key.name, new FormControl(lang.keyValue));
      });
    });

    this.projectKeySearchControl.valueChanges.subscribe((value) => {
      this.projectKeys = this.project.keysModel.filter((key) => {
        return key.name.toLowerCase().trim().includes(value.toLowerCase().trim());
      });
    });
    this.projectItemKeysForm.valueChanges.subscribe((value) => {
      this.project.keysModel.forEach((key) => {
        key.languages.forEach((lang, index) => {
          lang.keyValue = value[index + key.name];
        });
      });
    });
  }
}
