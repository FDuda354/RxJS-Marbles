import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoodFetchAndFormsComponent } from './good-fetch-and-forms.component';

describe('GoodFetchAndFormsComponent', () => {
  let component: GoodFetchAndFormsComponent;
  let fixture: ComponentFixture<GoodFetchAndFormsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GoodFetchAndFormsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GoodFetchAndFormsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
