import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MaterialModule } from '@angular/material';

import { LoklakFeedRoutingModule } from './feed-routing.module';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { FeedComponent } from './feed.component';
import { FeedHeaderComponent } from './feed-header/feed-header.component';
import { FeedFooterComponent } from './feed-footer/feed-footer.component';
import { FeedCardComponent } from './feed-card/feed-card.component';
import { FooterModule } from '../footer/footer.module';
import { FeedNotFoundComponent } from './feed-not-found/feed-not-found.component';
import { FeedLinkerComponent } from './feed-linker/feed-linker.component';
import { FeedPaginationComponent } from './feed-pagination/feed-pagination.component';
import { InfoBoxComponent } from './info-box/info-box.component';
import { UserInfoBoxComponent } from './user-info-box/user-info-box.component';
import { FeedLightboxComponent } from './feed-lightbox/feed-lightbox.component';
import { FeedUserCardComponent } from './feed-user-card/feed-user-card.component';
import { InViewportDirective } from '../shared//in-viewport.directive';
import { FeedLocationCustomizationComponent } from './feed-location-customization/feed-location-customization.component';
import { FeedTimeCustomizationComponent } from './feed-time-customization/feed-time-customization.component';
import { FeedAdvancedSearchComponent } from './feed-advanced-search/feed-advanced-search.component';


@NgModule({
	imports: [
		/**
		 * The `CommonModule` contributes many of the common directives that
		 * applications need including `ngIf` and `ngFor`.
		 * BrowserModule imports CommonModule and re-exports it.
		 * The net effect is that an importer of `BrowserModule` gets `CommonModule` directives automatically.
		 */
		CommonModule,

		/**
		 * The module required for the animations to work.
		 */
		BrowserAnimationsModule,

		/**
		 * `ReactiveFormsModule` declares all the important providers and directives
		 * for the "Model Driven Forms" which are easier to setup and test.
		 */
		ReactiveFormsModule,

		/**
		 * The ng module for Forms
		 */
		FormsModule,
		/**
 		 * The module for material design components
 		 */
		MaterialModule,

		/**
		 * Defines the routes at `feed` level of application.
		 */
		LoklakFeedRoutingModule,

		/**
		 * Declares a UI based footer module which is completely interoperable.
		 */
		FooterModule,

		/**
		* For showing Tweet Frequency in the searches
		**/
		ChartsModule
	],
	declarations: [
		FeedComponent,
		FeedHeaderComponent,
		FeedFooterComponent,
		FeedCardComponent,
		FeedNotFoundComponent,
		FeedLinkerComponent,
		FeedPaginationComponent,
		InfoBoxComponent,
		FeedLightboxComponent,
		InViewportDirective,
		UserInfoBoxComponent,
		FeedLightboxComponent,
		FeedUserCardComponent,
		FeedLocationCustomizationComponent,
		FeedTimeCustomizationComponent,
		FeedAdvancedSearchComponent
	]
})
export class FeedModule { }
