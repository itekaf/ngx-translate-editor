import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectItemComponent } from './project-item/project-item.component';
import { ProjectListComponent } from './project-list/project-list.component';
import { SharedModule } from 'app/shared/shared.module';
import { ProjectRoutingModule } from 'app/modules/project/project-routing.module';
import { MatSliderModule, MatTabsModule, MatDialogModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProjectEditComponent } from './project-edit/project-edit.component';
import { MatCardModule } from '@angular/material/card';
import { ProjectAddComponent } from './project-add/project-add.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';

@NgModule({
  declarations: [ProjectItemComponent, ProjectListComponent, ProjectEditComponent, ProjectAddComponent],
  imports: [
    CommonModule,  SharedModule, ProjectRoutingModule, MatTabsModule, BrowserAnimationsModule, MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatRippleModule,
    MatDialogModule

  ]
})
export class ProjectModule { }
