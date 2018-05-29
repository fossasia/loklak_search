import { NgModule, Component, Input, Output } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import {
	MatDialogModule,
	MatDialog,
	MatTooltipModule,
	MatMenuModule,
	MatIconModule,
	MatGridListModule
} from '@angular/material';
import { StoreModule } from '@ngrx/store';
import * as fromRoot from '../../reducers';

import { MediaWallMenuComponent } from './media-wall-menu.component';

describe('MediaWallMenuComponent', () => {
	let component: MediaWallMenuComponent;
	let fixture: ComponentFixture<MediaWallMenuComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			imports: [
				RouterTestingModule,
				BrowserAnimationsModule,
				MatDialogModule,
				MatMenuModule,
				MatIconModule,
				MatGridListModule,
				MatTooltipModule,
				StoreModule.forRoot(fromRoot.reducers),
				FormsModule,
				ReactiveFormsModule
			],
			declarations: [ MediaWallMenuComponent ]
		})
		.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(MediaWallMenuComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should be created', () => {
		expect(component).toBeTruthy();
	});
});
