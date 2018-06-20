import { TestBed, async, ComponentFixture } from '@angular/core/testing';
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
