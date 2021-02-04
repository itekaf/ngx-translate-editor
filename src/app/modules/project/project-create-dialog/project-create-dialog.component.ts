import { Component, OnInit, Inject} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";

import {ProjectModel} from "../../../core/models/project.model";
import {ElectronService} from "../../../core/services";
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-project-create-dialog',
  templateUrl: './project-create-dialog.component.html',
  styleUrls: ['./project-create-dialog.component.scss']
})
export class ProjectCreateDialogComponent implements OnInit {
  public projectFormGroup: FormGroup;
  public projectIdControl: FormControl = new FormControl();
  public projectNameControl: FormControl = new FormControl();
  public projectViewPathControl: FormControl = new FormControl();
  public projectLanguagesPathControl: FormControl = new FormControl();

  constructor(
    public dialogRef: MatDialogRef<ProjectCreateDialogComponent>,
    private electronService: ElectronService,
    @Inject(MAT_DIALOG_DATA) public project: ProjectModel,
  ) { }

  public ngOnInit(): void {
    this.buildForm();
  }

  public onNoClickAction(): void {
    this.dialogRef.close();
  }

  public OpenLanguagesFolderAction(): void {
    this.electronService.remote.dialog.showOpenDialog({ properties: ['openDirectory']})
      .then(result => {
        const folders: string[] = result.filePaths;
        if(folders && folders[0]) {
          const languagePath: string = folders[0];
          const correctViewsPath: string = this.electronService.path.normalize(this.electronService.path.join(languagePath.replace(/src\\.*/gmi, 'src/app/'), `**`, `*.{html,ts}`));
          const correctLanguagesPath: string = this.electronService.path.join(languagePath, '*.json').replace(`/`, `\\`);

          this.projectViewPathControl.setValue(correctViewsPath);
          this.projectLanguagesPathControl.setValue(correctLanguagesPath);
        }
      }).catch(err => {
      console.log(err);
    });
  }

  public resetProjectNameAction(): void {
    this.projectNameControl.setValue('');
  }

  public resetProjectLanguagesPathAction(): void {
    this.projectLanguagesPathControl.setValue('');
  }

  private buildForm(): void {
    this.projectIdControl = new FormControl(this.project.id);
    this.projectNameControl = new FormControl(this.project.name);
    this.projectViewPathControl = new FormControl(this.project.viewPath);
    this.projectLanguagesPathControl = new FormControl(this.project.languagesPath);
    this.projectFormGroup = new FormGroup({
      id: this.projectIdControl,
      name: this.projectNameControl,
      viewPath: this.projectViewPathControl,
      languagesPath: this.projectLanguagesPathControl,
    });
  }
}
