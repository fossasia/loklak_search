import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { LoklakHomeRoutingModule } from './home-routing.module';

import { HomeComponent } from './home.component';
import { FooterModule } from '../footer/footer.module';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,

		LoklakHomeRoutingModule,
		FooterModule
	],
	declarations: [
		HomeComponent
	],
	exports: []
})
export class HomeModule { }
