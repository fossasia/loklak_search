import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LazyImgComponent } from './lazy-img.component';
import { LazyImgService } from './lazy-img.service';

describe('LazyImgComponent', () => {
	let component: LazyImgComponent;
	let fixture: ComponentFixture<LazyImgComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ LazyImgComponent ],
			providers: [ LazyImgService ]
		})
		.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(LazyImgComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
