import { Injectable } from "@angular/core";
import { TableDatabaseInterface } from "app/core/interfaces";
import { LowdbService } from './lowdb.service';
import { ProjectModel } from 'app/core/models/project.model';

const defaultObject: TableDatabaseInterface = {
  main: [],
  settings: {}
};

@Injectable({
  providedIn: 'root'
})
export class ProjectLowdbService {
  public databaseName = 'projects';
  public defaultObject: TableDatabaseInterface = defaultObject;

  constructor(
    private lowdbService: LowdbService,
  ){}

  public init(): void {
    this.connect();
  }
  public connect(): any {
    return this.lowdbService.connect(this.databaseName, this.defaultObject);
  }

  public getAllProjects(): any {
    return this.connect().get('main').value();
  }

  public getProject(id: number): void {
    this.connect().get('main').find({ id }).value();
  }

  public setProject(item: ProjectModel): any {
    return this.connect().get('main').push(item).write();
  }

  public updateProject(item: ProjectModel): any {
    return this.connect().get('main').find({ id: item.id }).assign(item).write();
  }

  public removeProject(id: number): any {
    return this.connect().get('main').remove({ id }).write();
  }
}
