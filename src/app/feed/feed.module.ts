import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { LoklakFeedRoutingModule } from './feed-routing.module';

import { FeedComponent } from './feed.component';
import { FeedHeaderComponent } from './feed-header/feed-header.component';
import { FeedCardComponent } from './feed-card/feed-card.component';
import { FooterModule } from '../footer/footer.module';
import { FeedNotFoundComponent } from './feed-not-found/feed-not-found.component';
import { FeedLinkerComponent } from './feed-linker/feed-linker.component';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,

		LoklakFeedRoutingModule,
		FooterModule
	],
	declarations: [
		FeedComponent,
		FeedHeaderComponent,
		FeedCardComponent,
		FeedNotFoundComponent,
		FeedLinkerComponent
	]
})
export class FeedModule { }
