import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoklakAboutRoutingModule } from './about-routing.module';
import { AboutComponent } from './about.component';

import { FooterModule } from '../footer/footer.module';
import { NavbarModule } from '../navbar/navbar.module';
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

		LoklakAboutRoutingModule,
		NavbarModule,
		FooterModule
	],
	declarations: [
		AboutComponent
	]
})
export class AboutModule { }
