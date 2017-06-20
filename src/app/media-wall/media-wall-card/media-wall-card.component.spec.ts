import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MediaWallCardComponent } from './media-wall-card.component';

describe('MediaWallCardComponent', () => {
  let component: MediaWallCardComponent;
  let fixture: ComponentFixture<MediaWallCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MediaWallCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MediaWallCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
