import { Injectable } from "@angular/core";
import { ITableDatabase } from "app/core/interfaces";
import { LowdbService } from './lowdb.service';
import { ProjectModel } from 'app/core/models/project.model';

const defaultObject: ITableDatabase = {
  main: [],
  settings: {}
};

@Injectable({
  providedIn: 'root'
})
export class ProjectLowdbService {
  public databaseName: string = 'projects';
  public defaultObject: ITableDatabase = defaultObject;

  constructor(
    private lowdbService: LowdbService,
  ){}

  public init() {
    this.connect();
  }
  public connect() {
    return this.lowdbService.connect(this.databaseName, this.defaultObject);
  }

  public getAllProjects() {
    return this.connect().get('main').value();
  }

  public getProject(id: number) {
    this.connect().get('main').find({ id }).value()
  }

  public setProject(item: ProjectModel) {
    return this.connect().get('main').push(item).write();
  }

  public updateProject(item: ProjectModel) {
    return this.connect().get('main').find({ id: item.id }).assign(item).write();
  }

  public removeProject(id: number) {
    return this.connect().get('main').remove({ id }).write()
  }
}
