import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from 'app/modules/home/home-routing.module';

import { HomeComponent } from 'app/modules/home/home.component';
import { SharedModule } from 'app/shared/shared.module';

@NgModule({
  declarations: [HomeComponent],
  imports: [CommonModule, SharedModule, HomeRoutingModule]
})
export class HomeModule {}
