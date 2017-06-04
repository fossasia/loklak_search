import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from '@angular/material';

import { LoklakImprintRoutingModule } from './imprint-routing.module';
import { ImprintComponent } from './imprint.component';

@NgModule({
	imports: [
		/**
		 * The `CommonModule` contributes many of the common directives that
		 * applications need including `ngIf` and `ngFor`.
		 * BrowserModule imports CommonModule and re-exports it.
		 * The net effect is that an importer of `BrowserModule` gets `CommonModule` directives automatically.
		 */
		CommonModule,

		LoklakImprintRoutingModule
	],
	declarations: [
		ImprintComponent
	]
})
export class ImprintModule { }
