import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoklakPageNotFoundRoutingModule } from './pagenotfound-routing.module';
import { PageNotFoundComponent } from './pagenotfound.component';

import { RouterModule } from '@angular/router';

@NgModule({
	imports: [
		CommonModule,
		LoklakPageNotFoundRoutingModule,
		RouterModule
	],
	declarations: [
		PageNotFoundComponent
	]
})

export class PageNotFoundModule { }
