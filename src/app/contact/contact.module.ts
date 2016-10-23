import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoklakContactRoutingModule } from './contact-routing.module';
import { ContactComponent } from './contact.component';
import { FooterModule } from '../footer/footer.module';

@NgModule({
	imports: [
		CommonModule,

		LoklakContactRoutingModule,
		FooterModule
	],
	declarations: [
		ContactComponent
	]
})
export class ContactModule { }
