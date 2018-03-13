import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscriber } from 'rxjs/Subscriber';

@Injectable()
export class LazyImgService {
	private intersectionObserver: IntersectionObserver
		= new IntersectionObserver(this.observerCallback.bind(this), { rootMargin: '50% 50%', threshold: 1.0 });
	private elementSubscriberMap: Map<Element, Subscriber<boolean>>
		= new Map<Element, Subscriber<boolean>>();

	constructor() {
		this.__setBindings();
	}

	private __setBindings() {
		this.processStatus = this.processStatus.bind(this);
		this.getBufferResponse = this.getBufferResponse.bind(this);
	}

	private observerCallback(entries: IntersectionObserverEntry[], observer: IntersectionObserver) {

		entries.forEach(entry => {
			if (this.elementSubscriberMap.has(entry.target)) {
				if (entry.target.getBoundingClientRect().bottom >= 0 &&
					entry.target.getBoundingClientRect().right >= 0 &&
					entry.target.getBoundingClientRect().left <= entry.rootBounds.right &&
					entry.target.getBoundingClientRect().top <= entry.rootBounds.bottom
				)	{
					const subscriber = this.elementSubscriberMap.get(entry.target);
					subscriber.next(true);
					this.elementSubscriberMap.delete(entry.target);
				}
			}
		});
	}

	public observe(element: Element): Observable<boolean> {
		const observable: Observable<boolean> = new Observable<boolean>(subscriber => {
			this.elementSubscriberMap.set(element, subscriber);
		});

		this.intersectionObserver.observe(element);
		return observable;
	}

	public unobserve(element: Element): void {
		if (this.elementSubscriberMap.has(element)) {
			this.elementSubscriberMap.delete(element);
		}
		this.intersectionObserver.unobserve(element);
	}

	private processStatus(response: Response): Promise<Response> {
		if (response.status === 200 || response.status === 0) {
			return Promise.resolve(response);
		} else {
			return Promise.reject(response);
		}
	}

	private getBufferResponse(response: Response): Promise<ArrayBuffer> {
		return response.arrayBuffer();
	}

	private arrayBufferToBase64(buffer: ArrayBuffer): Promise<string> {
		let binary = '';
		const bytes = [].slice.call(new Uint8Array(buffer));

		bytes.forEach((b) => binary += String.fromCharCode(b));
		return Promise.resolve(window.btoa(binary));
	}

	public fetch(resource: string): Observable<string> {
		return new Observable<string>(subscriber => {
			fetch(resource)
				.then(this.processStatus)
				.then(this.getBufferResponse)
				.then(this.arrayBufferToBase64)
				.then(strBuffer => {
					subscriber.next(strBuffer);
					subscriber.complete();
				})
				.catch((error) => {
					subscriber.error(error);
					subscriber.complete();
				});
		});
	}
}
