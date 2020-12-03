import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectItemComponent } from './project-item/project-item.component';
import { ProjectListComponent } from './project-list/project-list.component';
import { SharedModule } from 'app/shared/shared.module';
import { HomeRoutingModule } from 'app/modules/home/home-routing.module';
import { ProjectRoutingModule } from 'app/modules/project/project-routing.module';

@NgModule({
  declarations: [ProjectItemComponent, ProjectListComponent],
  imports: [
    CommonModule,  SharedModule, ProjectRoutingModule
  ]
})
export class ProjectModule { }
