import { NgModule } from '@angular/core';
import { Route, Routes, RouterModule, PreloadingStrategy } from '@angular/router';
import { Observable, of } from 'rxjs';

export class CustomPreloadStrategy implements PreloadingStrategy {
	preload(route: Route, load: Function): Observable<any> {
		return route.data && route.data.preload ? load() : of(null);
	}
}

const routes: Routes = [
	{
		path: '',
		pathMatch: 'full',
		loadChildren: './home/home.module#HomeModule',
		data: { preload: true }
	},
	{
		path: 'about',
		loadChildren: './about/about.module#AboutModule'
	},
	{
		path: 'contact',
		loadChildren: './contact/contact.module#ContactModule'
	},
	{
		path: 'search',
		loadChildren: './feed/feed.module#FeedModule',
		data: { preload: true }
	},
	{
		path: 'privacy',
		loadChildren: './privacy/privacy.module#PrivacyModule'
	},
	{
		path: 'terms',
		loadChildren: './terms/terms.module#TermsModule'
	},
	{
		path: 'wall',
		loadChildren: './media-wall/media-wall.module#MediaWallModule'
	}
];

@NgModule({
	imports: [RouterModule.forRoot(routes, { preloadingStrategy: CustomPreloadStrategy })],
	exports: [RouterModule],
	providers: [ CustomPreloadStrategy ]
})
export class LoklakAppRoutingModule { }
