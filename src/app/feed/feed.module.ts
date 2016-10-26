import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { LinkyModule } from 'angular2-linky';

import { LoklakFeedRoutingModule } from './feed-routing.module';

import { FeedComponent } from './feed.component';
import { FeedHeaderComponent } from './feed-header/feed-header.component';
import { FeedCardComponent } from './feed-card/feed-card.component';
import { FooterModule } from '../footer/footer.module';
import { FeedNotFoundComponent } from './feed-not-found/feed-not-found.component';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,

		LinkyModule,

		LoklakFeedRoutingModule,
		FooterModule
	],
	declarations: [
		FeedComponent,
		FeedHeaderComponent,
		FeedCardComponent,
		FeedNotFoundComponent
	]
})
export class FeedModule { }
