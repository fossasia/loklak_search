import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MediaWallComponent } from './media-wall.component';

const routes: Routes = [
	{
		path: 'wall',
		component: MediaWallComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
	providers: []
})
export class LoklakMediaWallRoutingModule { }
