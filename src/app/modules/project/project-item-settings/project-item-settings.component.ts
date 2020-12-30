import {Component, EventEmitter, OnInit, Output, Input} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {ErrorTypes} from "ngx-translate-lint";
import {ProjectMainSettingModel, ProjectModel} from "../../../core/models";

@Component({
  selector: 'app-project-item-settings',
  templateUrl: './project-item-settings.component.html',
  styleUrls: ['./project-item-settings.component.scss']
})
export class ProjectItemSettingsComponent implements OnInit {
  @Input() project: ProjectModel;
  @Output() removeProjectEmitter: EventEmitter<void> = new EventEmitter<void>();
  @Output() saveProjectLintingSettingsEmitter: EventEmitter<ProjectMainSettingModel> = new EventEmitter<ProjectMainSettingModel>();

  public errorTypesList: ErrorTypes[] = [ ErrorTypes.disable, ErrorTypes.error, ErrorTypes.warning ];
  public projectItemSettingsForm: FormGroup;
  public projectLintingSettingsForm: FormGroup;
  public projectLintingViewsControl: FormControl = new FormControl();
  public projectLintingZombieControl: FormControl = new FormControl();
  constructor() { }

  ngOnInit() {
    this.buildForm();
  }

  public removeProjectAction() {
    this.removeProjectEmitter.emit();
  }

  public saveProjectLintingAction() {
    const projectSettings: ProjectMainSettingModel = {
      linting: this.projectLintingSettingsForm.value,
      settings: this.projectItemSettingsForm.value
    }
    this.saveProjectLintingSettingsEmitter.emit(projectSettings);
  }

  public saveProjectSettingsAction() {

  }

  private buildForm() {
    this.projectLintingViewsControl.setValue(this.project.settings.linting.views);
    this.projectLintingZombieControl.setValue(this.project.settings.linting.zombies);
    this.projectItemSettingsForm = new FormGroup({});
    this.projectLintingSettingsForm = new FormGroup({
      views: this.projectLintingViewsControl,
      zombies: this.projectLintingZombieControl,
    });
  }


}
