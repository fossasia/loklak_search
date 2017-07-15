import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '@angular/material';

import { MediaWallComponent } from './media-wall.component';
import { LoklakMediaWallRoutingModule } from './media-wall-routing.module';
import { MediaWallCardComponent } from './media-wall-card/media-wall-card.component';
import { MediaWallLinkerComponent } from './media-wall-linker/media-wall-linker.component';
import { MediaWallHeaderComponent } from './media-wall-header/media-wall-header.component';
import { ToggleFullscreenDirective } from '../shared';

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
		MediaWallCardComponent,
		MediaWallLinkerComponent,
		MediaWallHeaderComponent,
		ToggleFullscreenDirective,
	]

})
export class MediaWallModule { }
