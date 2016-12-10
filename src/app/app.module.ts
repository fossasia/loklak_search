import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';

import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';

import { reducer } from './reducers';
import { ApiSearchEffects } from './effects/api-search.effects';

import { LoklakAppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';

import { HomeModule } from './home/home.module';
import { FeedModule } from './feed/feed.module';
import { AboutModule } from './about/about.module';
import { ContactModule } from './contact/contact.module';
import { TermsModule } from './terms/terms.module';
import { SearchService } from './shared/services';

@NgModule({
	declarations: [
		/**
		 * The `<app-root>` component of the application which gets Bootstrapped.
		 * It is the top level component which `Angular` controls.
		 */
		AppComponent
	],
	imports: [
		/**
		 * `BrowserModule` registers critical application service providers.
		 * It also includes common directives like `NgIf` and `NgFor` which become immediately
		 * visible and usable in any of this modules component templates.
		 */
		BrowserModule,

		/**
		 * FormsModule declares all the important parts of the foem handling
		 * important for "Template Driven Forms".
		 */
		FormsModule,

		/**
		 * `ReactiveFormsModule` declares all the important providers and directives
		 * for the "Model Driven Forms" which are easier to setup and test.
		 */
		ReactiveFormsModule,

		/**
		 * The module that includes http's providers.
		 * The `HttpModule` is necessary for making `HTTP calls`.
		 */
		HttpModule,

		/**
		 * The module that includes jsonp's providers.
		 * The `JsonpModule` is necessary for making`JSONP calls`, (used in `SearchService`).
		 */
		JsonpModule,

		/**
     * StoreModule.provideStore is imported once in the root module, accepting a reducer
     * function or object map of reducer functions. If passed an object of
     * reducers, combineReducers will be run creating your application
     * meta-reducer. This returns all providers for an @ngrx/store
     * based application.
     */
		StoreModule.provideStore(reducer),

    /**
     * Store devtools instrument the store retaining past versions of state
     * and recalculating new states. This enables powerful time-travel
     * debugging.
     *
     * To use the debugger, install the Redux Devtools extension for either
     * Chrome or Firefox
     *
     * See: https://github.com/zalmoxisus/redux-devtools-extension
     */
		StoreDevtoolsModule.instrumentOnlyWithExtension(),

		/**
     * EffectsModule.run() sets up the effects class to be initialized
     * immediately when the application starts.
		 * Must be called multiple times for each effect class you want to run.
		 *
     * See: https://github.com/ngrx/effects/blob/master/docs/api.md#run
     */
		EffectsModule.run(ApiSearchEffects),

		/**
		 * Defines the routes at `root` level of the application.
		 */
		LoklakAppRoutingModule,

		/**
		 * Module responsible for `Home Page` of the Application.
		 */
		HomeModule,

		/**
		 * Module responsible for `Feed Page` of the Application.
		 * Comprises of `SearchHeader` and `FeedSearchResults`.
		 */
		FeedModule,

		/**
		 * Module defines the `About Page` of the Loklak Project.
		 */
		AboutModule,

		/**
		 * Module defines the `ContactUs Page` of the FossAsia Team.
		 */
		ContactModule,

		/**
		 * Module defines the `TermsAndServices Page` for the Loklak Project.
		 */
		TermsModule
	],
	providers: [
		/**
		 * Angular bridges the gap by providing a `Title` service as part of the `Browser platform`.
		 * The Title service is a simple class that provides an API for
		 * `getting` and `setting` the current HTML document title.
		 */
		Title,

		/**
		 * The major service used for making queries to the `Backend Lokalak Server`.
		 */
		SearchService
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
