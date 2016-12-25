import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoklakContactRoutingModule } from './contact-routing.module';
import { ContactComponent } from './contact.component';
import { FooterModule } from '../footer/footer.module';
import { RouterModule } from '@angular/router';

@NgModule({
	imports: [
		CommonModule,

		LoklakContactRoutingModule,
		FooterModule,
		RouterModule
	],
	declarations: [
		ContactComponent
	]
})
export class ContactModule { }
