import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoklakTermsRoutingModule } from './terms-routing.module';
import { TermsComponent } from './terms.component';
import { NavbarModule } from '../navbar/navbar.module';
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

		LoklakTermsRoutingModule,
		NavbarModule,
		FooterModule
	],
	declarations: [
		TermsComponent
	]
})
export class TermsModule { }
