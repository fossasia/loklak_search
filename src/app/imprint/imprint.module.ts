import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoklakImprintRoutingModule } from './imprint-routing.module';
import { ImprintComponent } from './imprint.component';

@NgModule({
	imports: [
		CommonModule,

		LoklakImprintRoutingModule
	],
	declarations: [
		ImprintComponent
	]
})
export class ImprintModule { }
