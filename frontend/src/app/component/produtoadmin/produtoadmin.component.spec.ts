import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdutoadminComponent } from './produtoadmin.component';

describe('ProdutoadminComponent', () => {
  let component: ProdutoadminComponent;
  let fixture: ComponentFixture<ProdutoadminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProdutoadminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProdutoadminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
