import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoklakTermsRoutingModule } from './terms-routing.module';
import { TermsComponent } from './terms.component';
import { FooterModule } from '../footer/footer.module';
import { RouterModule } from '@angular/router';

@NgModule({
	imports: [
		CommonModule,

		LoklakTermsRoutingModule,
		FooterModule,
		RouterModule
	],
	declarations: [
		TermsComponent
	]
})
export class TermsModule { }
