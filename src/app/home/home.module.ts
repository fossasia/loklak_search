import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MdTooltipModule } from '@angular/material';

import { LoklakHomeRoutingModule } from './home-routing.module';

import { HomeComponent } from './home.component';
import { FooterModule } from '../footer/footer.module';

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
		 * `ReactiveFormsModule` declares all the important providers and directives
		 * for the "Model Driven Forms" which are easier to setup and test.
		 */
		ReactiveFormsModule,

		/**
		 * Angular Material Modules
		 */
		MdTooltipModule,

		/**
		 * Defines the routes at `home` level of application.
		 */
		LoklakHomeRoutingModule,

		/**
		 * Declares a UI based footer module which is completely interoperable.
		 */
		FooterModule
	],
	declarations: [
		/**
		 * The `<app-home>` component of the application which is the source origin of application.
		 * It controls the `design` and `logic` for the `Home Page` of the application.
		 */
		HomeComponent
	],
	exports: []
})
export class HomeModule { }
