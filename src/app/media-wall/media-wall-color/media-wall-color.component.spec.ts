import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreModule } from '@ngrx/store';
import { reducer } from '../../reducers';
import { ReactiveFormsModule } from '@angular/forms';
import { MediaWallColorComponent } from './media-wall-color.component';
import { MediaWallsColor } from '../../models/media-wall';

describe('MediaWallColorComponent', () => {

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			imports: [
				RouterTestingModule,
				ReactiveFormsModule,
				StoreModule.provideStore(reducer)
			],
			declarations: [ MediaWallColorComponent ]
		})
		.compileComponents();
	}));

it('should create an instance', () => {
		const component = TestBed.createComponent(MediaWallColorComponent);
		expect(component).toBeTruthy();
	});
});

