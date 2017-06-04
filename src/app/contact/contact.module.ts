import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';

import { LoklakContactRoutingModule } from './contact-routing.module';
import { ContactComponent } from './contact.component';
import { FooterModule } from '../footer/footer.module';
import { NavbarModule } from '../navbar/navbar.module';
import { RouterModule } from '@angular/router';
import { ContactFormComponent } from './contact-form/contact-form.component';

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

		LoklakContactRoutingModule,
		NavbarModule,
		FooterModule,
		RouterModule,
		HttpModule,
		JsonpModule
	],
	declarations: [
		ContactComponent,
		ContactFormComponent
	]
})
export class ContactModule { }
