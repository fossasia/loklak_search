import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatIconModule, MatButtonModule } from '@angular/material';
import { ServiceBoxComponent } from './service-box.component';

describe('ServiceBoxComponent', () => {
	let component: ServiceBoxComponent;
	let fixture: ComponentFixture<ServiceBoxComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			imports: [
				MatButtonModule,
				MatIconModule
			],
			declarations: [ ServiceBoxComponent ]
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(ServiceBoxComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should be created', () => {
		expect(component).toBeTruthy();
	});
});
