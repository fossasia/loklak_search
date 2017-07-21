import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LazyImgComponent } from './lazy-img.component';
import { LazyImgService } from './lazy-img.service';

@NgModule({
	imports: [
		CommonModule
	],
	declarations: [
		LazyImgComponent
	],
	providers: [
		LazyImgService
	],
	exports: [
		LazyImgComponent
	]
})
export class LazyImgModule { }
