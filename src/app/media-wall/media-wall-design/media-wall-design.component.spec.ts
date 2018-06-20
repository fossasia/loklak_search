import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TestBed } from '@angular/core/testing';
import {
	MatDialogModule,
	MatDialog,
	MatSlideToggleModule,
	MatSelectModule
} from '@angular/material';
import { MediaWallDesignComponent } from './media-wall-design.component';
import { StoreModule } from '@ngrx/store';
import * as fromRoot from '../../reducers';

describe('MediaWallModerationComponent', () => {
	let component: MediaWallDesignComponent;
	let dialog: MatDialog;
	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [
				RouterTestingModule,
				BrowserAnimationsModule,
				MatDialogModule,
				MatSlideToggleModule,
				MatSelectModule,
				StoreModule.forRoot(fromRoot.reducers),
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
			dialog = TestBed.get(MatDialog);
			const dialogRef = dialog.open(MediaWallDesignComponent);

			component = dialogRef.componentInstance;
		});

	it('should create an instance', () => {
		expect(component).toBeTruthy();
	});
});
