import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { FeedComponent } from './feed/feed.component';
import { HomeComponent } from './home/home.component';
import { TermsComponent } from './terms/terms.component';

const routes: Routes = [{
		path: 'about',
		pathMatch: 'full',
		component: AboutComponent
	},
	{
		path: 'contact',
		pathMatch: 'full',
		component: ContactComponent
	},
	{
		path: 'search',
		component: FeedComponent
	},
	{
		path: '',
		pathMatch: 'full',
		component: HomeComponent
	},
	{
		path: 'terms',
		pathMatch: 'full',
		component: TermsComponent
	},
	{
		path:'**',
		redirectTo:''
	}
	];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
	providers: []
})
export class LoklakAppRoutingModule { }
