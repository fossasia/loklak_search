import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { LoklakHomeRoutingModule } from './home-routing.module';

import { HomeComponent } from './home.component';
import { SearchBarComponent } from './search-bar/search-bar.component';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,

		LoklakHomeRoutingModule
	],
	declarations: [
		HomeComponent,
		SearchBarComponent
	],
	exports: []
})
export class HomeModule { }
