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
	MdSelectModule
} from '@angular/material';
import { MediaWallDesignComponent } from './media-wall-design.component';
import { StoreModule } from '@ngrx/store';
import * as fromRoot from '../../reducers';

describe('MediaWallModerationComponent', () => {
	let component: MediaWallDesignComponent;
	let dialog: MdDialog;
	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [
				RouterTestingModule,
				BrowserAnimationsModule,
				MdDialogModule,
				MdSlideToggleModule,
				MdSelectModule,
				StoreModule.provideStore(fromRoot.reducer),
				FormsModule,
				ReactiveFormsModule
			],
			declarations: [
				MediaWallDesignComponent
			]
		});
		TestBed.overrideModule(BrowserDynamicTestingModule, {
		set: {
			entryComponents: [ MediaWallDesignComponent ]
		}
});
	});
	beforeEach(() => {
			dialog = TestBed.get(MdDialog);
			const dialogRef = dialog.open(MediaWallDesignComponent);

			component = dialogRef.componentInstance;
		});

	it('should create an instance', () => {
		expect(component).toBeTruthy();
	});
});
