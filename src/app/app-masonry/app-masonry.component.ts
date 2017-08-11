declare var require: any;
declare var imagesLoaded: any;

import { Component, OnInit, OnDestroy, Input, Output, ElementRef, EventEmitter } from '@angular/core';

import * as masonry from 'masonry-layout';

import { MasonryOptions } from './masonry-options';

@Component({
		selector: '[masonry], masonry',
		template: '<ng-content></ng-content>'
})
export class AngularMasonryComponent implements OnInit, OnDestroy {

	public _msnry: any;
	@Input() public options: MasonryOptions;
	@Input() public useImagesLoaded: Boolean = false;
	@Output() layoutComplete: EventEmitter<any[]> = new EventEmitter<any[]>();
	@Output() removeComplete: EventEmitter<any[]> = new EventEmitter<any[]>();

	constructor(
		private _element: ElementRef
	) { }

	ngOnInit() {
	// Set default itemSelector
		if (!this.options.itemSelector) {
			this.options.itemSelector = '[masonry-brick], masonry-brick';
		}

  // Set element display to block
		if (this._element.nativeElement.tagName === 'MASONRY') {
			this._element.nativeElement.style.display = 'block';
		}

   // Initialize Masonry
		this._msnry = new masonry(this._element.nativeElement, this.options);

  // Bind to events
		this._msnry.on('layoutComplete', (items: any) => {
				this.layoutComplete.emit(items);
		});
		this._msnry.on('removeComplete', (items: any) => {
			this.removeComplete.emit(items);
		});
	}

	ngOnDestroy() {
		if (this._msnry) {
			this._msnry.destroy();
		}
	}

	public layout() {
		setTimeout(() => {
			this._msnry.layout();
		});
	}

	public add(element: HTMLElement) {
		let isFirstItem = false;

    // Check if first item
		if (this._msnry.items.length === 0) {
			isFirstItem = true;
		}

		if (this.useImagesLoaded) {
			imagesLoaded(element, (instance: any) => {
				this._element.nativeElement.prependChild(element);

      	// Tell Masonry that a child element has been added
				this._msnry.prepended(element);

      	// layout if first item
				if (isFirstItem) {
					this.layout();
				}
			});

			this._element.nativeElement.removeChild(element);
		}
		else {
		// Tell Masonry that a child element has been added
		this._msnry.prepended(element);
            // layout if first item
			if (isFirstItem) {
				this.layout();
			}
		}
	}

	public remove(element: HTMLElement) {
    // Tell Masonry that a child element has been removed
		this._msnry.remove(element);

    // Layout items
		this.layout();
	}
}
