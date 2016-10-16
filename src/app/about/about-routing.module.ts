import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AboutComponent } from './about.component';

const routes: Routes = [
	{
		path: 'about',
		pathMatch: 'full',
		component: AboutComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
	providers: []
})
export class LoklakAboutRoutingModule { }
