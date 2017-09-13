import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PrivacyComponent } from './privacy.component';

const routes: Routes = [
	{
		path: '',
		component: PrivacyComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
	providers: []
})
export class LoklakPrivacyRoutingModule { }
