import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoklakSettingsRoutingModule } from './settings-routing.module';
import { SettingsComponent } from './settings.component';

import { FooterModule } from '../footer/footer.module';
import { NavbarModule } from '../navbar/navbar.module';

@NgModule({
	imports: [
		/**
		 * The `CommonModule` contributes many of the common directives that
		 * applications need including `ngIf` and `ngFor`.
		 * BrowserModule imports CommonModule and re-exports it.
		 * The net effect is that an importer of `BrowserModule` gets `CommonModule` directives automatically.
		 */
		CommonModule,
		LoklakSettingsRoutingModule,
		NavbarModule,
		FooterModule
	],
	declarations: [
		SettingsComponent
	]
})
export class SettingsModule { }
