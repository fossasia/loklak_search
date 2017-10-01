import { NgModule } from '@angular/core';
import { Component, Input, Output } from '@angular/core';
import { TestBed, async } from '@angular/core/testing';
import { MdSlideToggleModule } from '@angular/material';
import { MediaWallCustomCardComponent } from './media-wall-custom-card.component';


describe('MediaWallCustomCardComponent', () => {
	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [,
				MdSlideToggleModule
			],
			declarations: [
				MediaWallCustomCardComponent
			]
		});

		it('should create an instance', () => {
			const fixture = TestBed.createComponent(MediaWallCustomCardComponent);
			const component = fixture.debugElement.componentInstance;
			expect(component).toBeTruthy();
		});
	});
});
