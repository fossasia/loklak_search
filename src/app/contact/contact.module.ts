import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';

import { LoklakContactRoutingModule } from './contact-routing.module';
import { ContactComponent } from './contact.component';
import { FooterModule } from '../footer/footer.module';
import { NavbarModule } from '../navbar/navbar.module';
import { RouterModule } from '@angular/router';
import { ContactFormComponent } from './contact-form/contact-form.component';

import { AgmCoreModule } from 'angular2-google-maps/core';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		LoklakContactRoutingModule,
		NavbarModule,
		FooterModule,
		RouterModule,
		HttpModule,
		JsonpModule,
		AgmCoreModule.forRoot({
		      apiKey: 'AIzaSyB7iLsjY72WDuvj2j_HZ2VG8s40lNzvqqc'
	    })
	],
	declarations: [
		ContactComponent,
		ContactFormComponent
	]
})
export class ContactModule { }
