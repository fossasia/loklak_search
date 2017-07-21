import {
	Component,
	Input,
	Output,
	EventEmitter,
	ElementRef,
	ChangeDetectorRef,
	OnInit,
	OnDestroy
} from '@angular/core';
import { LazyImgService } from './lazy-img.service';


@Component({
	selector: 'app-lazy-img',
	templateUrl: './lazy-img.component.html',
	styleUrls: ['./lazy-img.component.scss'],
})
export class LazyImgComponent implements OnInit, OnDestroy {
	private static readonly SUPPORTED_IMAGE_FORMATS: Array<string>
		= ['jpeg', 'jpg', 'png', 'gif', 'ico', 'bmp', 'svg'];

	@Input() src: string;
	@Input() width: number;
	@Input() height: number;
	@Input() alt: string;
	@Input() showError = true;
	@Output() load: EventEmitter<boolean> = new EventEmitter<boolean>();
	private imageType: string = null;
	public isLoading = false;
	public loaded = false;
	public loadError = false;
	public loadErrorMessage =  'Error';

	constructor(
		private elementRef: ElementRef,
		private changeDetectorRef: ChangeDetectorRef,
		private lazyImgService: LazyImgService
	) { }

	ngOnInit() {
		this.getImageTypeFromSrc();
		this.setupIntersectionObserver();
	}

	ngOnDestroy() {
		this.lazyImgService
				.unobserve(this.elementRef.nativeElement);
	}

	private getImageTypeFromSrc() {
		if (!this.src) {
			return;
		}
		const imageName = this.src.split('/').pop();
		const imageExtension = imageName.split('.').pop();

		if (LazyImgComponent.SUPPORTED_IMAGE_FORMATS.indexOf(imageExtension) === -1) {
			this.imageType = null;
		}
		else {
			this.imageType = imageExtension;
		}
	}

	private setupIntersectionObserver() {
		this.lazyImgService
				.observe(this.elementRef.nativeElement)
				.subscribe(value => {
					if (value) {
						this.loadImage();
					}
				});
	}

	private loadImage() {
		if (this.imageType) {
			if (!this.loaded) {
				this.isLoading = true;
				this.lazyImgService
						.fetch(this.src)
						.subscribe(this.handleResponse.bind(this), this.handleError.bind(this));
			}
		}
		else {
			const error: Error = new Error(`Image type not supported: Only supports jpeg, jpg, png, gif, ico, bmp, svg`);
			this.handleError({ error: error, status: '400'});
			this.load.emit(false);
		}
	}

	private handleResponse(imageStr: string) {
		const base64Flag = `data:image/${this.imageType};base64,`;
		this.elementRef.nativeElement.querySelector('img').src = base64Flag + imageStr;

		requestAnimationFrame(() => {
			requestAnimationFrame(() => {
				this.isLoading = false;
				this.loaded = true;
				this.loadError = false;
				this.changeDetectorRef.detectChanges();
			});
		});
	}


	private handleError(error) {
		this.isLoading = false;
		this.loaded = false;
		this.loadError = true;
		this.loadErrorMessage = error.status.toString();
		this.load.emit(false);
	}

	public getWidth() {
		return (this.width) ? this.width + 'px' : 'auto' ;
	}

	public getHeight() {
		return (this.height) ? this.height + 'px' : 'auto' ;
	}
}
