import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { LoklakFeedRoutingModule } from './feed-routing.module';

import { FeedComponent } from './feed.component';
import { FeedHeaderComponent } from './feed-header/feed-header.component';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,

		LoklakFeedRoutingModule
	],
	declarations: [
		FeedComponent,
		FeedHeaderComponent
	]
})
export class FeedModule { }
