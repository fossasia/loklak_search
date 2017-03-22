import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MaterialModule } from '@angular/material';

import { FooterComponent } from './footer.component';

@NgModule({
	imports: [
		CommonModule,
		RouterModule,

		/**
 		 * The module for material design components
 		 */
		MaterialModule,
	],
	declarations: [
		FooterComponent
	],
	exports: [
		FooterComponent
	]
})
export class FooterModule { }
