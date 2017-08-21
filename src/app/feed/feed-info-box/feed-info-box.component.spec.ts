import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedInfoBoxComponent } from './feed-info-box.component';
import { RouterTestingModule } from '@angular/router/testing';
import { MdChipsModule, MdCardModule } from '@angular/material';

describe('FeedInfoBoxComponent', () => {
	let component: FeedInfoBoxComponent;
	let fixture: ComponentFixture<FeedInfoBoxComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			imports: [
				RouterTestingModule,
				MdChipsModule,
				MdCardModule
			],
			declarations: [
				FeedInfoBoxComponent
			]
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(FeedInfoBoxComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should be created', () => {
		expect(component).toBeTruthy();
	});
});
