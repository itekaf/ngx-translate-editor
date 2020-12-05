import { Component, OnInit } from '@angular/core';
import { ProjectModel } from 'app/core/models/project.model';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss']
})
export class ProjectListComponent implements OnInit {
  public projects: ProjectModel[] = [];
  selected = new FormControl(0);
  constructor() { }

  ngOnInit() {
    this.projects = [
      {
        name: 'project 1',
        path: './src',
        viewPath: './src',
        languagesPath: './src'
      },
      {
        name: 'project 2',
        path: './src',
        viewPath: './src',
        languagesPath: './src'
      }
    ]
  }

  addProject() {
    this.projects.push({
      name: 'New Project'
    });
    this.selected.setValue(this.projects.length - 1);

  }

}
