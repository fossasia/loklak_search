import { Component, OnInit, ElementRef } from '@angular/core';
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
		private router: Router,
		private elementRef: ElementRef
	) { }

	ngOnInit() {
		this.focusTextbox();
	}

	private focusTextbox() {
		this.elementRef.nativeElement.querySelector('div.search-form input#search').focus();
	}

	private handleTypeStart(event: KeyboardEvent): void {
		// Keypress events not working well with Firefox during the switching of the page from home to feed.
		// Thus we need to use keydown event and then filter out only the "Character Keys"
		// This filtering process can be extended till more precise keypress event.
		// Please update this list as the project progresses.

		switch (event.keyCode) {
			case 8:  // Backspace / Mac Delete
			case 9:  // Tab
			case 13: // Enter
			case 14: // Return (Gecko old) [Obsolete]
			case 16: // Shift
			case 17: // Ctrl
			case 18: // Alt
			case 19: // Pause/Break
			case 20: // Caps Lock
			case 27: // Escape
			case 32: // Space
			case 33: // Pg Up
			case 34: // Pg Down
			case 35: // End
			case 36: // Home
			case 37: // Left
			case 38: // Up
			case 39: // Right
			case 40: // Down
			case 41: // Linux Select
			case 44: // Print Screen
			case 45: // Insert
			case 46: // Delete
			case 93: // Context Menu
			case 144: // Num Lock
			case 145: // Scroll Lock

			// Mac CMD Key
			case 91: // Safari, Chrome
			case 93: // Safari, Chrome
			case 224: // Firefox

			// Mac Num Lock
			case 12:
				return;
			default:
				break;
		}

		if (event.metaKey || event.ctrlKey || event.altKey) {	// Combination of keys with control, alt and cmd
			return;
		}

		if (event.keyCode >= 112 && event.keyCode <= 135) { // Function keys (F1-F24)
			return;
		}

		this.router.navigateByUrl(`/search`, { skipLocationChange: true });
	}
}
