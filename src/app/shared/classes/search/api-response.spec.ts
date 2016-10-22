/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ApiResponse, ApiResponseMetadata, ApiResponseResult, ApiResponseUser } from './api-response';

describe('ApiResponse', () => {
	it('should create an instance', () => {
		expect(new ApiResponse()).toBeTruthy();
	});
});

describe('ApiResponse meta-data', () => {
	it('should create an instance', () => {
		expect(new ApiResponseMetadata()).toBeTruthy();
	});
});

describe('ApiResponse result', () => {
	it('should create an instance', () => {
		expect(new ApiResponseResult()).toBeTruthy();
	});
});

describe('ApiResponse user', () => {
	it('should create an instance', () => {
		expect(new ApiResponseUser()).toBeTruthy();
	});
});


