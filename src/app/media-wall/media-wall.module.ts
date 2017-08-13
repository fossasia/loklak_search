import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
	MdTabsModule,
	MdIconModule,
	MdSlideToggleModule,
	MdDialogModule,
	MdCheckboxModule,
	MdSelectModule,
	MdMenuModule,
	MdGridListModule,
	MdTooltipModule
} from '@angular/material';

import { LazyImgModule } from '../lazy-img/lazy-img.module';
import { ColorPickerModule } from 'ngx-color-picker';
import { MasonryModule } from '../app-masonry';

import { MediaWallComponent } from './media-wall.component';
import { LoklakMediaWallRoutingModule } from './media-wall-routing.module';
import { MediaWallFluidCardComponent } from './media-wall-fluid-card/media-wall-fluid-card.component';
import { MediaWallLinkerComponent } from './media-wall-linker/media-wall-linker.component';
import { MediaWallHeaderComponent } from './media-wall-header/media-wall-header.component';
import { ToggleFullscreenDirective } from '../shared';
import { MediaWallCustomizationComponent } from './media-wall-customization/media-wall-customization.component';
import { MediaWallCustomHeaderComponent } from './media-wall-custom-header/media-wall-custom-header.component';
import { MediaWallCustomBackgroundComponent } from './media-wall-custom-background/media-wall-custom-background.component';
import { MediaWallCustomCardComponent } from './media-wall-custom-card/media-wall-custom-card.component';
import { MediaWallNotFoundComponent } from './media-wall-not-found/media-wall-not-found.component';
import { MediaWallMenuComponent } from './media-wall-menu/media-wall-menu.component';
import { MediaWallQueryComponent } from './media-wall-query/media-wall-query.component';
import { MediaWallModerationComponent } from './media-wall-moderation/media-wall-moderation.component';
import { MediaWallDesignComponent } from './media-wall-design/media-wall-design.component';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		MdTabsModule,
		MdIconModule,
		MdSlideToggleModule,
		LoklakMediaWallRoutingModule,
		ColorPickerModule,
		MasonryModule,
		LazyImgModule,
		MdDialogModule,
		MdCheckboxModule,
		MdSelectModule,
		MdMenuModule,
		MdGridListModule,
		MdTooltipModule
	],
	declarations: [
		MediaWallComponent,
		MediaWallFluidCardComponent,
		MediaWallLinkerComponent,
		MediaWallHeaderComponent,
		ToggleFullscreenDirective,
		MediaWallCustomizationComponent,
		MediaWallCustomHeaderComponent,
		MediaWallCustomBackgroundComponent,
		MediaWallCustomCardComponent,
		MediaWallNotFoundComponent,
		MediaWallMenuComponent,
		MediaWallQueryComponent,
		MediaWallModerationComponent,
		MediaWallDesignComponent
	],
	entryComponents: [
		MediaWallCustomizationComponent,
		MediaWallQueryComponent,
		MediaWallModerationComponent,
		MediaWallDesignComponent
	]

})
export class MediaWallModule { }
