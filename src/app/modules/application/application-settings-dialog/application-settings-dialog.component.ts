import { LanguagesShortEnum} from 'app/core/enum';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import {AppSettingsLowdbService} from "../../../core/services/lowdb/app.settings.lowdb.service";
import {TranslateService} from "@ngx-translate/core";
import {AppSettingsModel} from "../../../core/models";


@Component({
  selector: 'app-application-settings-dialog',
  templateUrl: './application-settings-dialog.component.html',
  styleUrls: ['./application-settings-dialog.component.scss']
})
export class ApplicationSettingsDialogComponent implements OnInit {
  public appSettings: AppSettingsModel;
  public languagesList: LanguagesShortEnum[] = [ LanguagesShortEnum.en, LanguagesShortEnum.ru ]

  public appSettingsFormGroup: FormGroup;
  public languagesControl: FormControl = new FormControl();

  constructor(
    private translateService: TranslateService,
    private appSettingsLowdbService: AppSettingsLowdbService,
    public dialogRef: MatDialogRef<ApplicationSettingsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: AppSettingsModel,
  ) { }

  ngOnInit() {
    this.appSettings = this.appSettingsLowdbService.getSettings();
    this.buildForm();
  }

  onNoClickAction(): void {
    this.dialogRef.close();
  }

  public buildForm() {
    this.languagesControl.setValue(this.appSettings.language);
    this.appSettingsFormGroup = new FormGroup({
      language: this.languagesControl,
    });
  }
}
