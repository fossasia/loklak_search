import { NgModule } from '@angular/core';
import { Component, Input, Output } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TestBed, async } from '@angular/core/testing';
import {
	MdDialogModule,
	MdDialog,
	MdSlideToggleModule,
	MdSelectModule,
	MdCheckboxModule
} from '@angular/material';
import { MediaWallModerationComponent } from './media-wall-moderation.component';
import { StoreModule } from '@ngrx/store';
import * as fromRoot from '../../reducers';
import { MasonryModule } from '../../app-masonry';
import { LazyImgModule } from '../../lazy-img/lazy-img.module';

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

describe('MediaWallModerationComponent', () => {
	let component: MediaWallModerationComponent;
	let dialog: MdDialog;
	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [
				RouterTestingModule,
				BrowserAnimationsModule,
				MdDialogModule,
				MdSlideToggleModule,
				MdCheckboxModule,
				MdSelectModule,
				StoreModule.provideStore(fromRoot.reducer),
				FormsModule,
				ReactiveFormsModule,
				MasonryModule,
				LazyImgModule
			],
			declarations: [
				MediaWallModerationComponent,
				MediaWallLinkerStubComponent
			]
		});
		TestBed.overrideModule(BrowserDynamicTestingModule, {
		set: {
			entryComponents: [ MediaWallModerationComponent ]
		}
});
	});
	beforeEach(() => {
			dialog = TestBed.get(MdDialog);
			const dialogRef = dialog.open(MediaWallModerationComponent);

			component = dialogRef.componentInstance;
		});

	it('should create an instance', () => {
		expect(component).toBeTruthy();
	});
});
