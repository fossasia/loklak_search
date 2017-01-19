import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PageNotFoundComponent } from './pagenotfound.component';

const routes: Routes = [
	{
		path: '**',
		component: PageNotFoundComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
	providers: []
})
export class LoklakPageNotFoundRoutingModule { }
