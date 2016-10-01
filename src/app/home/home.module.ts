import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoklakHomeRoutingModule } from './home-routing.module';

import { HomeComponent } from './home.component';

@NgModule({
	imports: [
		CommonModule,

		LoklakHomeRoutingModule
	],
	declarations: [
		HomeComponent
	],
	exports: []
})
export class HomeModule { }
