import {
	Component,
	Input,
	Output,
	ViewChild,
	OnInit,
	OnDestroy,
	EventEmitter,
	ChangeDetectionStrategy
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../reducers';
import { Observable, Subscription } from 'rxjs';
import { MatAutocompleteTrigger } from '@angular/material';

import { SuggestResults } from '../../models/api-suggest';
import * as speechactions from '../../actions/speech';
import { AuthService } from './../../services/auth.service';
import * as firebase from 'firebase/app';

@Component({
	selector: 'feed-header',
	templateUrl: './feed-header.component.html',
	styleUrls: ['./feed-header.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class FeedHeaderComponent implements OnInit, OnDestroy {
	private __subscriptions__: Subscription[] = new Array<Subscription>();
	@Input() query: string;
	@Input() suggestionList: SuggestResults[];
	@Input() doCloseSuggestBox$: Observable<boolean>;
	@Output() searchEvent: EventEmitter<string> = new EventEmitter<string>();
	@Output() relocateEvent: EventEmitter<string> = new EventEmitter<string>();
	@ViewChild(MatAutocompleteTrigger) autoCompleteTrigger: MatAutocompleteTrigger;
	public searchInputControl = new FormControl();
	public inputFocused = false;
	hidespeech: Observable<boolean>;
	public user: Observable<firebase.User>;

	constructor(
		private store: Store<fromRoot.State>,
		private afAuth: AuthService
	) {
		this.hidespeech = store.select(fromRoot.getspeechStatus);
		this.user = this.afAuth.authState;
	}

	speechRecognition() {
		this.store.dispatch(new speechactions.SearchAction(true));
	}

	ngOnInit() { }

	private setupSuggestBoxClosing() {
		this.__subscriptions__.push(
			this.doCloseSuggestBox$
					.subscribe(value => {
						if (value) {
							this.autoCompleteTrigger.closePanel();
						}
					})
		);
	}

	onEnter(event: any) {
		if (event.which === 13) {
			if (this.searchInputControl.value.trim() !== '') {
				this.searchEvent.emit(this.searchInputControl.value.trim());
				this.setupSuggestBoxClosing();
			}
		}
	}

	public closeSuggestBox(): void {
		this.autoCompleteTrigger.closePanel();
	}

	logout() {
		this.afAuth.logout();
	}

	ngOnDestroy() {
		this.__subscriptions__.forEach(subscription => subscription.unsubscribe());
	}
}
