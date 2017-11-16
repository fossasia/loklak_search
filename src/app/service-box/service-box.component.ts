import {
	Component,
	OnInit
} from '@angular/core';

@Component({
	selector: 'service-box',
	templateUrl: './service-box.component.html',
	styleUrls: ['./service-box.component.scss']
})
export class ServiceBoxComponent implements OnInit {
	public opened = false;

	constructor() { }

	ngOnInit() {
	}
}
