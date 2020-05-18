import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItunesAlbumComponent } from './itunes-album.component';

describe('ItunesAlbumComponent', () => {
  let component: ItunesAlbumComponent;
  let fixture: ComponentFixture<ItunesAlbumComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItunesAlbumComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItunesAlbumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
