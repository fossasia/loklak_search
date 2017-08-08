import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularMasonryComponent } from './app-masonry.component';
import { AngularMasonryBrickDirective } from './brick';

@NgModule({
	imports: [
		CommonModule
	],
	declarations: [
		AngularMasonryComponent,
		AngularMasonryBrickDirective
	],
	exports: [
		AngularMasonryComponent,
		AngularMasonryBrickDirective
	]
})
export class MasonryModule { }
