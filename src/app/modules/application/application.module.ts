import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApplicationSettingsDialogComponent } from './application-settings-dialog/application-settings-dialog.component';
import {SharedModule} from "../../shared/shared.module";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ProjectRoutingModule} from "../project/project-routing.module";
import {CdkTreeModule} from "@angular/cdk/tree";

@NgModule({
  declarations: [ApplicationSettingsDialogComponent],
  imports: [
    CommonModule,
    SharedModule,
    ProjectRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    CdkTreeModule,
  ],
  entryComponents: [ ApplicationSettingsDialogComponent ]
})
export class ApplicationModule { }
