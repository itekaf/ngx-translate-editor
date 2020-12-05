import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { ProjectModel } from 'app/core/models/project.model';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ProjectAddComponent } from 'app/modules/project/project-add/project-add.component';
import { ElectronService } from 'app/core/services';
import { Router } from '@angular/router';
import { NgxTranslateLintService } from 'app/core/services/ngx-translate-lint/ngx-translate-lint.service';
import * as NodePath from "path";

@Component({
  selector: 'app-project-item',
  templateUrl: './project-item.component.html',
  styleUrls: ['./project-item.component.scss']
})
export class ProjectItemComponent implements OnInit {
  @Input() project: ProjectModel;
  animal: string;
  name: string;
  constructor(
    public dialog: MatDialog,
    private electronService: ElectronService,
    private cdRef: ChangeDetectorRef,
    private router: Router,
    private ngxTranslateLintService: NgxTranslateLintService
  ) { }

  ngOnInit(

  ) {
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ProjectAddComponent, {
      width: '250px',
      data: {name: this.name, animal: this.animal}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }

  OpenLanguagesFolder() {
    this.electronService.remote.dialog.showOpenDialog({ properties: ['openDirectory']})
      .then(result => {
        const folders: string[] = result.filePaths;
        if(folders && folders[0]) {
          this.project.languagesPath = folders[0];
 /*         this.languages = this.readDir(folders[0]);
          this.languages.forEach((fileName) => {
            this.readFile(folders[0] + '\\' + fileName);
          });*/
          this.cdRef.markForCheck();
        }
      }).catch(err => {
      console.log(err);
    });
  }

  OpenViewsFolder() {
    this.electronService.remote.dialog.showOpenDialog({ properties: ['openDirectory']})
      .then(result => {
        const folders: string[] = result.filePaths;
        if(folders && folders[0]) {
          this.project.viewPath = folders[0];
          /*         this.languages = this.readDir(folders[0]);
                   this.languages.forEach((fileName) => {
                     this.readFile(folders[0] + '\\' + fileName);
                   });*/
          this.cdRef.markForCheck();
        }
      }).catch(err => {
        console.log(err);
    });


  }
  RunLint() {
    const correctViewsPath: string = NodePath.normalize(NodePath.join(this.project.viewPath, `**`, `*.{html,ts}`));
    const correctLanguagesPath: string = NodePath.normalize(NodePath.join( this.project.languagesPath, '*.json'));
    this.ngxTranslateLintService.run(correctViewsPath, correctLanguagesPath);
  }


}
