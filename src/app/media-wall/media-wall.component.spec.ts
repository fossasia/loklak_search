/* tslint:disable:no-unused-variable */

import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TestBed, async } from '@angular/core/testing';
import { Route } from '@angular/router';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
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



describe('Component: Feed', () => {
	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [
				RouterTestingModule,
				ReactiveFormsModule,
				StoreModule.provideStore(reducer)
			],
			declarations: [
				MediaWallComponent,
				MediaWallCardStubComponent,
				MediaWallLinkerStubComponent
			]
		});
	});

	it('should create an instance', async(() => {
		const fixture = TestBed.createComponent(MediaWallComponent);
		const component = fixture.debugElement.componentInstance;
		expect(component).toBeTruthy();
	}));

});
