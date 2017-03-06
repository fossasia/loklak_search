import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoklakTermsRoutingModule } from './terms-routing.module';
import { TermsComponent } from './terms.component';
import { NavbarModule } from '../navbar/navbar.module';
import { FooterModule } from '../footer/footer.module';
import { RouterModule } from '@angular/router';

@NgModule({
	imports: [
		CommonModule,

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
