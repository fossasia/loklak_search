import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TermsComponent } from './terms.component';

const routes: Routes = [
	{
		path: 'terms',
		pathMatch: 'full',
		component: TermsComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
	providers: []
})
export class LoklakTermsRoutingModule { }
