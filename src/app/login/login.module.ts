import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoklakLoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import {
	MatAutocompleteModule,
	MatMenuModule,
	MatIconModule,
	MatButtonModule,
	MatButtonToggleModule
} from '@angular/material';

@NgModule({
	imports: [
		/**
		 * The `CommonModule` contributes many of the common directives that
		 * applications need including `ngIf` and `ngFor`.
		 * BrowserModule imports CommonModule and re-exports it.
		 * The net effect is that an importer of `BrowserModule` gets `CommonModule` directives automatically.
		 */
		CommonModule,

		LoklakLoginRoutingModule,
		ReactiveFormsModule,
		FormsModule,
		MatAutocompleteModule,
		MatMenuModule,
		MatIconModule,
		MatButtonModule,
		MatButtonToggleModule
	],
	declarations: [
		LoginComponent
	]
})
export class LoginModule { }
