import { NgModule } from '@angular/core';
import { Component, Input, Output } from '@angular/core';
import { TestBed, async } from '@angular/core/testing';
import { MatSlideToggleModule } from '@angular/material';
import { MediaWallCustomBackgroundComponent } from './media-wall-custom-background.component';


describe('MediaWallCustomCardComponent', () => {
	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [,
				MatSlideToggleModule
			],
			declarations: [
				MediaWallCustomBackgroundComponent
			]
		});

		it('should create an instance', () => {
			const fixture = TestBed.createComponent(MediaWallCustomBackgroundComponent);
			const component = fixture.debugElement.componentInstance;
			expect(component).toBeTruthy();
		});
	});
});
