import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from '@angular/material';

import { LoklakTermsRoutingModule } from './terms-routing.module';
import { TermsComponent } from './terms.component';
import { NavbarModule } from '../navbar/navbar.module';
import { FooterModule } from '../footer/footer.module';
import { RouterModule } from '@angular/router';

@NgModule({
	imports: [
		CommonModule,

		/**
 		 * The module for material design components
 		 */
		MaterialModule,

		LoklakTermsRoutingModule,
		NavbarModule,
		FooterModule,
		RouterModule
	],
	declarations: [
		TermsComponent
	]
})
export class TermsModule { }
