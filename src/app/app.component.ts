import { Component } from '@angular/core';
import {Router, NavigationEnd} from '@angular/router';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent {
	title = 'Loklak Search!';
        constructor(private router: Router) {
            router.events.subscribe(event : Event => {
                if (event is NavigationEnd) {
                    window.scrollTo(0, 0);
                    }
            });
     }
}
