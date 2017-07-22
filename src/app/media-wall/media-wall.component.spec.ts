/* tslint:disable:no-unused-variable */

import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TestBed, async } from '@angular/core/testing';
import { Route } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { MdDialogModule, MdDialog, MaterialModule } from '@angular/material';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreModule } from '@ngrx/store';
import { MediaWallCustomizationComponent } from './media-wall-customization/media-wall-customization.component';

import { reducer } from '../reducers';
import { RouterStub } from '../../testing';
import { MediaWallComponent } from './media-wall.component';




@Component({
	selector: 'media-wall-card',
	template: ''
})
class MediaWallCardStubComponent {
	@Input() feedItem;
	@Input() wallCustomCard$;
}


@Component({
	selector: 'media-wall-linker',
	template: ''
})
class MediaWallLinkerStubComponent {
	@Input() text;
	@Input() hashtags;
	@Input() mentions;
	@Input() links;
	@Input() unshorten;
	@Input() useAll;
	@Input() wallCustomText;
	@Output() onShowed;
}

@Component({
	selector: 'media-wall-header',
	template: ''
})
class MediaWallHeaderStubComponent {
	@Input() showHideMenu;
	@Input() query;
	@Input() wallCustomHeader;
}

@Component({
	selector: 'media-wall-custom-header',
	template: ''
})
class MediaWallCustomHeaderStubComponent {
	@Input() mediaWallHeader;
}

@Component({
	selector: 'media-wall-custom-background',
	template: ''
})
class MediaWallCustomBackgroundStubComponent {
	@Input() mediaWallBackground;
}

@Component({
	selector: 'media-wall-custom-card',
	template: ''
})
class MediaWallCustomCardStubComponent {
	@Input() mediaWallCard;
}

describe('Component: MediaWall', () => {
	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [
				RouterTestingModule,
				ReactiveFormsModule,
				FormsModule,
				MdDialogModule.forRoot(),
				MaterialModule,
				StoreModule.provideStore(reducer)
			],
			declarations: [
				MediaWallComponent,
				MediaWallCardStubComponent,
				MediaWallLinkerStubComponent,
				MediaWallHeaderStubComponent,
				MediaWallCustomizationComponent,
				MediaWallCustomHeaderStubComponent,
				MediaWallCustomCardStubComponent,
				MediaWallCustomBackgroundStubComponent
			]
		});
		TestBed.overrideModule(BrowserDynamicTestingModule, {
		set: {
			entryComponents: [ MediaWallCustomizationComponent ]
		}
});
	});

	it('should create an instance', async(() => {
		const fixture = TestBed.createComponent(MediaWallComponent);
		const component = fixture.debugElement.componentInstance;
		expect(component).toBeTruthy();
	}));

});
