import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { LoklakContactRoutingModule } from './contact-routing.module';
import { ContactComponent } from './contact.component';
import { FooterModule } from '../footer/footer.module';
import { RouterModule } from '@angular/router';

@NgModule({
	imports: [
		CommonModule,
		BrowserModule,
		FormsModule,
		LoklakContactRoutingModule,
		FooterModule,
		RouterModule
	],
	declarations: [
		ContactComponent
	]
})
export class ContactModule { }
