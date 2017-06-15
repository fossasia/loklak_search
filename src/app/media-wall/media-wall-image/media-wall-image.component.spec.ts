import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreModule } from '@ngrx/store';
import { reducer } from '../../reducers';
import { ReactiveFormsModule } from '@angular/forms';
import { MediaWallImageComponent } from './media-wall-image.component';

describe('MediaWallImageComponent', () => {

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			imports: [
				RouterTestingModule,
				ReactiveFormsModule,
				StoreModule.provideStore(reducer)
			],
			declarations: [ MediaWallImageComponent ]
		})
		.compileComponents();
	}));

it('should create an instance', () => {
		const component = TestBed.createComponent(MediaWallImageComponent);
		expect(component).toBeTruthy();
	});
});

