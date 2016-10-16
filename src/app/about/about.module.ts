import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoklakAboutRoutingModule } from './about-routing.module';
import { AboutComponent } from './about.component';

@NgModule({
	imports: [
		CommonModule,

		LoklakAboutRoutingModule
	],
	declarations: [
		AboutComponent
	]
})
export class AboutModule { }
