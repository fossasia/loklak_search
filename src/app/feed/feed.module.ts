import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { LinkyModule } from 'angular2-linky';

import { LoklakFeedRoutingModule } from './feed-routing.module';

import { FeedComponent } from './feed.component';
import { FeedHeaderComponent } from './feed-header/feed-header.component';
import { FeedCardComponent } from './feed-card/feed-card.component';
import { FooterModule } from '../footer/footer.module';

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
		FeedCardComponent
	]
})
export class FeedModule { }
