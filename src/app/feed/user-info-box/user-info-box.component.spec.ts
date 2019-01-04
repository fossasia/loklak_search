import { UserInfoBoxComponent } from './user-info-box.component';
import { Component, Input, Output } from '@angular/core';
import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreModule } from '@ngrx/store';
import * as fromRoot from '../../reducers';

@Component({
	selector: 'feed-linker',
	template: ''
})
class FeedLinkerStubComponent {
	@Input() text;
	@Input() hashtags;
	@Input() mentions;
	@Input() links;
	@Input() unshorten;
	@Input() useAll;
	@Output() showed;
}

describe('Component: UserInfoBox', () => {
	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [
				RouterTestingModule,
				StoreModule.forRoot(fromRoot.reducers)
			],
			declarations: [
				UserInfoBoxComponent,
				FeedLinkerStubComponent
			]
		});
	});

	it('should create an instance', () => {
		const fixture = TestBed.createComponent(UserInfoBoxComponent);
		const component = fixture.debugElement.componentInstance;
		expect(component).toBeTruthy();
	});

	it('should do something on ngOnInit', async(() => {
		const fixture = TestBed.createComponent(UserInfoBoxComponent);
		const component = fixture.debugElement.componentInstance;

		component.apiResponseUserFollowing = [
			{
				username: 'user1',
				followers_count: 5,
				statuses_count: 10
			},
			{
				username: 'user2',
				followers_count: 2,
				statuses_count: 15
			},
			{
				username: 'user3',
				followers_count: 10,
				statuses_count: 5
			},
		];

		component.apiResponseUserFollowers = [
			{
				username: 'userF1',
				followers_count: 2,
				statuses_count: 10
			},
			{
				username: 'userF2',
				followers_count: 2,
				statuses_count: 15
			},
			{
				username: 'userF3',
				followers_count: 2,
				statuses_count: 10
			}
		];
		component.ngOnInit();
		expect(component.sortedApiResponseUserFollowing[0].username).toBeTruthy('user3');
		expect(component.sortedApiResponseUserFollowing[1].username).toBeTruthy('user1');
		expect(component.sortedApiResponseUserFollowing[2].username).toBeTruthy('user2');

		expect(component.sortedApiResponseUserFollowers[0].username).toBeTruthy('userF2');
		expect(component.sortedApiResponseUserFollowers[1].username).toBeTruthy('userF1');
		expect(component.sortedApiResponseUserFollowers[2].username).toBeTruthy('userF3');
	}));
});
