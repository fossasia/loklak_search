import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '@angular/material';

import { MediaWallComponent } from './media-wall.component';
import { MediaWallColorComponent } from './media-wall-color/media-wall-color.component';
import { LoklakMediaWallRoutingModule } from './media-wall-routing.module';
import { MediaWallImageComponent } from './media-wall-image/media-wall-image.component';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		BrowserAnimationsModule,
		MaterialModule,
		LoklakMediaWallRoutingModule
	],
	declarations: [
		MediaWallComponent,
		MediaWallColorComponent,
		MediaWallImageComponent
	]
})
export class MediaWallModule { }
