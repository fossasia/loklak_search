import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MaterialModule } from '@angular/material';

import { NavbarComponent } from './navbar.component';

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
		NavbarComponent
	],
	exports: [
		NavbarComponent
	]
})
export class NavbarModule { }
