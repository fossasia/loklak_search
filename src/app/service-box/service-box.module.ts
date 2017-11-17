import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
	MatButtonModule,
	MatIconModule
} from '@angular/material';
import { LazyImgModule } from '../lazy-img/lazy-img.module';
import { ServiceBoxComponent } from './service-box.component';

@NgModule({
	imports: [
		CommonModule,

		MatIconModule,
		MatButtonModule,

		LazyImgModule
	],
	declarations: [
		ServiceBoxComponent
	],
	exports: [
		ServiceBoxComponent
	]
})
export class ServiceBoxModule { }
