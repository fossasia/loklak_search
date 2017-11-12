import { NgModule } from '@angular/core';
import { Component, Input, Output } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TestBed, async } from '@angular/core/testing';
import { MatDialogModule, MatDialog } from '@angular/material';
import { MediaWallCustomizationComponent } from './media-wall-customization.component';
import { StoreModule } from '@ngrx/store';
import * as fromRoot from '../../reducers';

@Component({
	selector: 'media-wall-custom-header',
	template: ''
})
class MediaWallCustomHeaderStubComponent {
	@Input() mediaWallHeader;
}

@Component({
	selector: 'media-wall-custom-background',
	template: ''
})
class MediaWallCustomBackgroundStubComponent {
	@Input() mediaWallBackground;
}

@Component({
	selector: 'media-wall-custom-card',
	template: ''
})
class MediaWallCustomCardStubComponent {
	@Input() mediaWallCard;
}


describe('MediaWallCustomizationComponent', () => {
	let component: MediaWallCustomizationComponent;
	let dialog: MatDialog;
	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [
				RouterTestingModule,
				BrowserAnimationsModule,
				MatDialogModule,
				StoreModule.provideStore(fromRoot.reducer),
				FormsModule,
				ReactiveFormsModule
			],
			declarations: [
				MediaWallCustomizationComponent,
				MediaWallCustomHeaderStubComponent,
				MediaWallCustomCardStubComponent,
				MediaWallCustomBackgroundStubComponent
			]
		});
		TestBed.overrideModule(BrowserDynamicTestingModule, {
		set: {
			entryComponents: [ MediaWallCustomizationComponent ]
		}
});
	});
	beforeEach(() => {
			dialog = TestBed.get(MatDialog);
			const dialogRef = dialog.open(MediaWallCustomizationComponent);

			component = dialogRef.componentInstance;
		});

	it('should create an instance', () => {
		expect(component).toBeTruthy();
	});
});
