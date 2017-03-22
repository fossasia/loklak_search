import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from '@angular/material';

import { LoklakPageNotFoundRoutingModule } from './pagenotfound-routing.module';
import { PageNotFoundComponent } from './pagenotfound.component';

import { RouterModule } from '@angular/router';

@NgModule({
	imports: [
		CommonModule,
		RouterModule,

		/**
 		 * The module for material design components
 		 */
		MaterialModule,

		LoklakPageNotFoundRoutingModule,
	],
	declarations: [
		PageNotFoundComponent
	]
})

export class PageNotFoundModule { }
