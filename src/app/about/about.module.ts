import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoklakAboutRoutingModule } from './about-routing.module';
import { AboutComponent } from './about.component';

import { FooterModule } from '../footer/footer.module';
import { NavbarModule } from '../navbar/navbar.module';
import { RouterModule } from '@angular/router';

@NgModule({
	imports: [
		CommonModule,

		LoklakAboutRoutingModule,
		NavbarModule,
		FooterModule,
		RouterModule
	],
	declarations: [
		AboutComponent
	]
})
export class AboutModule { }
