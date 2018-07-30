import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoklakSettingsRoutingModule } from './settings-routing.module';
import { SettingsComponent } from './settings.component';

@NgModule({
	imports: [
		/**
		 * The `CommonModule` contributes many of the common directives that
		 * applications need including `ngIf` and `ngFor`.
		 * BrowserModule imports CommonModule and re-exports it.
		 * The net effect is that an importer of `BrowserModule` gets `CommonModule` directives automatically.
		 */
		CommonModule,
		LoklakSettingsRoutingModule
	],
	declarations: [
		SettingsComponent
	]
})
export class SettingsModule { }
