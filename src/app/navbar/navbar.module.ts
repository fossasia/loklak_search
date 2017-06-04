import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { NavbarComponent } from './navbar.component';

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
	],
	declarations: [
		NavbarComponent
	],
	exports: [
		NavbarComponent
	]
})
export class NavbarModule { }
