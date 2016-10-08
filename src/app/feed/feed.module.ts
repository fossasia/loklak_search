import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoklakFeedRoutingModule } from './feed-routing.module';

import { FeedComponent } from './feed.component';

@NgModule({
	imports: [
		CommonModule,

		LoklakFeedRoutingModule
	],
	declarations: [
		FeedComponent
	]
})
export class FeedModule { }
