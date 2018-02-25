import { Injectable, NgZone } from '@angular/core';
import { Observable } from 'rxjs/Rx';

interface IWindow extends Window {
	webkitSpeechRecognition: any;
}

@Injectable()
export class SpeechService {

	constructor(private zone: NgZone) { }

	record(lang: string): Observable<string> {
				return Observable.create(observe => {
						const { webkitSpeechRecognition }: IWindow = <IWindow>window;
						const recognition = new webkitSpeechRecognition();

						recognition.continuous = true;
						recognition.interimResults = true;
						recognition.onresult = take => this.zone.run(() =>
								observe.next(take.results.item(take.results.length - 1).item(0).transcript)
						);

						recognition.onerror = err => observe.error(err);
						recognition.onend = () => observe.complete();
						recognition.lang = lang;
						recognition.start();
				});
		}
}
