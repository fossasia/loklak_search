import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { LoklakHomeRoutingModule } from './home-routing.module';

import { HomeComponent } from './home.component';
import { HomeFooterComponent } from './home-footer/home-footer.component';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,

		LoklakHomeRoutingModule
	],
	declarations: [
		HomeComponent,
		HomeFooterComponent
	],
	exports: []
})
export class HomeModule { }
