/* tslint:disable:no-unused-variable */

import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TestBed, async } from '@angular/core/testing';
import { Route } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '@angular/material';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreModule } from '@ngrx/store';

import { reducer } from '../reducers';
import { RouterStub } from '../../testing';
import { MediaWallComponent } from './media-wall.component';




@Component({
	selector: 'media-wall-card',
	template: ''
})
class MediaWallCardStubComponent {
	@Input() feedItem;
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
	@Output() onShowed;
}

@Component({
	selector: 'media-wall-header',
	template: ''
})
class MediaWallHeaderStubComponent {
	@Input() showHideMenu;
	@Input() query;
}


describe('Component: MediaWall', () => {
	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [
				RouterTestingModule,
				ReactiveFormsModule,
				FormsModule,
				MaterialModule,
				StoreModule.provideStore(reducer)
			],
			declarations: [
				MediaWallComponent,
				MediaWallCardStubComponent,
				MediaWallLinkerStubComponent,
				MediaWallHeaderStubComponent
			]
		});
	});

	it('should create an instance', async(() => {
		const fixture = TestBed.createComponent(MediaWallComponent);
		const component = fixture.debugElement.componentInstance;
		expect(component).toBeTruthy();
	}));

});
