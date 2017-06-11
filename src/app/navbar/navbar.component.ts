import { Component, OnInit, trigger, state, style, transition, animate } from '@angular/core';

@Component({
	selector: 'app-navbar',
	templateUrl: './navbar.component.html',
	styleUrls: ['./navbar.component.scss'],
	animations: [
		trigger('slideInOut', [
			state('in', style({
				transform: 'translate3d(-100%, 0, 0)',
				height: '0px'
			})),
			state('out', style({
				transform: 'translate3d(0, 0, 0)',
				height: '120px'
			})),
			transition('in => out', animate('400ms ease-in-out')),
			transition('out => in', animate('400ms ease-in-out'))
		])
	]
})
export class NavbarComponent implements OnInit {
	public menuState = 'in';

	constructor() { }

	ngOnInit() { }

	toggleMenu() {
		this.menuState = this.menuState === 'out' ? 'in' : 'out';
	}

}
