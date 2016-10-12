import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
	private header: string = 'Loklak Search!';
	private headerImageUrl: string = 'assets/images/cow_150x175.png';

	constructor(
		private router: Router
	) { }

	ngOnInit() { }

	private handleTypeStart(event: KeyboardEvent): void {
		if (event.charCode === 13) {	// Early exit if Enter is pressed
			return;
		}
		this.router.navigateByUrl(`/search`, { skipLocationChange: true });
	}
}
