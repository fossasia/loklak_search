import { Component } from '@angular/core';
import {Router, NavigationEnd} from "@angular/router";

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent {
	title = 'Loklak Search!';
    constructor(private router: Router) {
    router.events.subscribe((val) => {
     if (val instanceof NavigationEnd){
     window.scrollTo(0,0);
     }
     });
     }
}
