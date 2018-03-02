import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {MediaWallComponent} from './media-wall.component';

const routes: Routes = [
	{
		path: '',
		component: MediaWallComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
	providers: []
})
export class LoklakMediaWallRoutingModule { }
