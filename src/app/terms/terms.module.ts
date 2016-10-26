import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoklakTermsRoutingModule } from './terms-routing.module';
import { TermsComponent } from './terms.component';

@NgModule({
	imports: [
		CommonModule,

		LoklakTermsRoutingModule
	],
	declarations: [
		TermsComponent
	]
})
export class TermsModule { }
