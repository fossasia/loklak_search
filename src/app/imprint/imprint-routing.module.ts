import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ImprintComponent } from './imprint.component';

const routes: Routes = [
	{
		path: 'imprint',
		pathMatch: 'full',
		component: ImprintComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
	providers: []
})
export class LoklakImprintRoutingModule { }
