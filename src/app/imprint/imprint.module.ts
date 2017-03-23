import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from '@angular/material';

import { LoklakImprintRoutingModule } from './imprint-routing.module';
import { ImprintComponent } from './imprint.component';

@NgModule({
	imports: [
		CommonModule,

		/**
 		 * The module for material design components
 		 */
		MaterialModule,

		LoklakImprintRoutingModule
	],
	declarations: [
		ImprintComponent
	]
})
export class ImprintModule { }
