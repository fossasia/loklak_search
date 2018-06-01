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
import { Location } from '@angular/common';

import { Store } from '@ngrx/store';
import * as fromRoot from '../../reducers';

import * as queryAction from '../../actions/query';

import { Observable, Subscription } from 'rxjs';

import { MatAutocompleteTrigger } from '@angular/material';

import { SuggestResults } from '../../models/api-suggest';
import * as speechactions from '../../actions/speech';
import { SpeechService } from '../../services/speech.service';


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

	constructor(
		private store: Store<fromRoot.State>,
		private speech: SpeechService
	) {
		this.hidespeech = store.select(fromRoot.getspeechStatus);
	}

	speechRecognition() {
		this.store.dispatch(new speechactions.SearchAction(true));
	}

	ngOnInit() {
		this.setupSearchField();
		this.setupSuggestBoxClosing();
	}

	private setupSearchField(): void {
		this.__subscriptions__.push(
			this.searchInputControl
					.valueChanges
					.subscribe(query => {
						this.searchEvent.emit(query);
					})
		);
	}

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

	public closeSuggestBox(): void {
		this.autoCompleteTrigger.closePanel();
	}

		ngOnDestroy() {
			this.__subscriptions__.forEach(subscription => subscription.unsubscribe());
		}
}
