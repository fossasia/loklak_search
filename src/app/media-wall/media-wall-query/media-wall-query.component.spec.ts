import { NgModule } from '@angular/core';
import { Component, Input, Output } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TestBed, async } from '@angular/core/testing';
import { MdDialogModule, MdDialog, MaterialModule } from '@angular/material';
import { MediaWallQueryComponent } from './media-wall-query.component';
import { StoreModule } from '@ngrx/store';
import * as fromRoot from '../../reducers';

describe('MediaWallQueryComponent', () => {
	let component: MediaWallQueryComponent;
	let dialog: MdDialog;
	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [
				RouterTestingModule,
				BrowserAnimationsModule,
				MdDialogModule,
				MaterialModule,
				StoreModule.provideStore(fromRoot.reducer),
				FormsModule,
				ReactiveFormsModule
			],
			declarations: [
				MediaWallQueryComponent
			]
		});
		TestBed.overrideModule(BrowserDynamicTestingModule, {
		set: {
			entryComponents: [ MediaWallQueryComponent ]
		}
});
	});
	beforeEach(() => {
			dialog = TestBed.get(MdDialog);
			const dialogRef = dialog.open(MediaWallQueryComponent);

			component = dialogRef.componentInstance;
		});

	it('should create an instance', () => {
		expect(component).toBeTruthy();
	});
});
