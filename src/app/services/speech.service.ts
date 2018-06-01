import { Injectable, NgZone } from '@angular/core';
import { Observable } from 'rxjs';

interface IWindow extends Window {
	webkitSpeechRecognition: any;
}

@Injectable()
export class SpeechService {

	recognition: any;

	constructor(private zone: NgZone) { }

	record(lang: string): Observable<string> {
		return Observable.create(observe => {
			const { webkitSpeechRecognition }: IWindow = <IWindow>window;
			this.recognition = new webkitSpeechRecognition();

			this.recognition.continuous = true;
			this.recognition.interimResults = true;
			this.recognition.onresult = take => this.zone.run(() =>
					observe.next(take.results.item(take.results.length - 1).item(0).transcript)
			);

			this.recognition.onerror = err => observe.error(err);
			this.recognition.onend = () => observe.complete();
			this.recognition.lang = lang;
			this.recognition.start();
		});
	}
	stoprecord() {
		if (this.recognition) {
			this.recognition.stop();
		}
	}
}
