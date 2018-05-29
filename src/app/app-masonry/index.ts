import { AngularMasonryComponent } from './app-masonry.component';
import { AngularMasonryBrickDirective } from './brick';

export { MasonryModule } from './app-masonry.module';
export { AngularMasonryComponent } from './app-masonry.component';
export { AngularMasonryBrickDirective } from './brick';
export { MasonryOptions } from './masonry-options';

export const MASONRY_DIRECTIVES = [
	AngularMasonryComponent,
	AngularMasonryBrickDirective
];
