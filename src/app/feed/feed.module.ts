import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SpeechService } from '../services/speech.service';

import {
	MatAutocompleteModule,
	MatMenuModule,
	MatIconModule,
	MatButtonModule,
	MatButtonToggleModule
} from '@angular/material';

import { LoklakFeedRoutingModule } from './feed-routing.module';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { LazyImgModule } from '../lazy-img/lazy-img.module';
import { ServiceBoxModule } from '../service-box/service-box.module';
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
import { InViewportDirective } from '../shared/in-viewport.directive';
import { FeedAdvancedSearchComponent } from './feed-advanced-search/feed-advanced-search.component';
import { FeedNewsComponent } from './feed-news/feed-news.component';


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
		 * `ReactiveFormsModule` declares all the important providers and directives
		 * for the "Model Driven Forms" which are easier to setup and test.
		 */
		ReactiveFormsModule,

		/**
		 * The Angular module for Forms
		 */
		FormsModule,

		/**
 		 * The modules for material design components
 		 */
		MatAutocompleteModule,
		MatMenuModule,
		MatIconModule,
		MatButtonModule,
		MatButtonToggleModule,

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
		ChartsModule,

		/**
		* Declares a UI based service box module - box which contains the information of
			* Loklak services.
			*/
		ServiceBoxModule,

		/**

		 * Module for lazy image loading.
		 */
		LazyImgModule
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
		FeedAdvancedSearchComponent,
		FeedNewsComponent
	],
	providers: [
		SpeechService
	]
})
export class FeedModule { }
