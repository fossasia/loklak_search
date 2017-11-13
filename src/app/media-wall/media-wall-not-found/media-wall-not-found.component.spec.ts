import { NgModule, Component, Input, Output } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { MatDialogModule, MatDialog } from '@angular/material';
import { StoreModule } from '@ngrx/store';
import * as fromRoot from '../../reducers';

import { MediaWallNotFoundComponent } from './media-wall-not-found.component';
import { LazyImgModule } from '../../lazy-img/lazy-img.module';

describe('MediaWallNotFoundComponent', () => {
	let component: MediaWallNotFoundComponent;
	let fixture: ComponentFixture<MediaWallNotFoundComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			imports: [
				LazyImgModule
			],
			declarations: [  MediaWallNotFoundComponent ]
		})
		.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent( MediaWallNotFoundComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should be created', () => {
		expect(component).toBeTruthy();
	});
});
