import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '@angular/material';
import { LazyImgModule } from '../lazy-img/lazy-img.module';

import { ColorPickerModule } from 'ngx-color-picker';

import { MediaWallComponent } from './media-wall.component';
import { LoklakMediaWallRoutingModule } from './media-wall-routing.module';
import { MediaWallCardComponent } from './media-wall-card/media-wall-card.component';
import { MediaWallLinkerComponent } from './media-wall-linker/media-wall-linker.component';
import { MediaWallHeaderComponent } from './media-wall-header/media-wall-header.component';
import { ToggleFullscreenDirective } from '../shared';
import { MediaWallCustomizationComponent } from './media-wall-customization/media-wall-customization.component';
import { MediaWallCustomHeaderComponent } from './media-wall-custom-header/media-wall-custom-header.component';
import { MediaWallCustomBackgroundComponent } from './media-wall-custom-background/media-wall-custom-background.component';
import { MediaWallCustomCardComponent } from './media-wall-custom-card/media-wall-custom-card.component';
import { MediaWallNotFoundComponent } from './media-wall-not-found/media-wall-not-found.component';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		BrowserAnimationsModule,
		MaterialModule,
		LoklakMediaWallRoutingModule,
		ColorPickerModule,
		LazyImgModule
	],
	declarations: [
		MediaWallComponent,
		MediaWallCardComponent,
		MediaWallLinkerComponent,
		MediaWallHeaderComponent,
		ToggleFullscreenDirective,
		MediaWallCustomizationComponent,
		MediaWallCustomHeaderComponent,
		MediaWallCustomBackgroundComponent,
		MediaWallCustomCardComponent,
		MediaWallNotFoundComponent,
	],
	entryComponents: [
		MediaWallCustomizationComponent
	]

})
export class MediaWallModule { }
