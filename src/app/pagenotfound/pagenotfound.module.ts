import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoklakPageNotFoundRoutingModule } from './pagenotfound-routing.module';
import { PageNotFoundComponent } from './pagenotfound.component';

import { RouterModule } from '@angular/router';

@NgModule({
	imports: [
		/**
		 * The `CommonModule` contributes many of the common directives that
		 * applications need including `ngIf` and `ngFor`.
		 * BrowserModule imports CommonModule and re-exports it.
		 * The net effect is that an importer of `BrowserModule` gets `CommonModule` directives automatically.
		 */
		CommonModule,

		/**
		 * Module used by Angular-Router to provide `routerLink` directive.
		 */
		RouterModule,

		LoklakPageNotFoundRoutingModule,
	],
	declarations: [
		PageNotFoundComponent
	]
})

export class PageNotFoundModule { }
