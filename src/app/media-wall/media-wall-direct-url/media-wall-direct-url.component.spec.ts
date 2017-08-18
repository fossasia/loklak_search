import { NgModule } from '@angular/core';
import { Component, Input, Output } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { TestBed, async } from '@angular/core/testing';
import { MdDialogModule, MdDialog, MaterialModule } from '@angular/material';
import { MediaWallDirectUrlComponent } from './media-wall-direct-url.component';
import { StoreModule } from '@ngrx/store';
import * as fromRoot from '../../reducers';

describe(' MediaWallDirectUrlComponent', () => {
	let component: MediaWallDirectUrlComponent;
	let dialog: MdDialog;
	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [
				BrowserAnimationsModule,
				MdDialogModule,
				MaterialModule,
				StoreModule.provideStore(fromRoot.reducer),
			],
			declarations: [
				MediaWallDirectUrlComponent
			]
		});
		TestBed.overrideModule(BrowserDynamicTestingModule, {
		set: {
			entryComponents: [  MediaWallDirectUrlComponent ]
		}
});
	});
	beforeEach(() => {
			dialog = TestBed.get(MdDialog);
			const dialogRef = dialog.open( MediaWallDirectUrlComponent);

			component = dialogRef.componentInstance;
		});

	it('should create an instance', () => {
		expect(component).toBeTruthy();
	});
});
