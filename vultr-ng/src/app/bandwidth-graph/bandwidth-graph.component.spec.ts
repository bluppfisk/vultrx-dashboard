import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BandwidthGraphComponent } from './bandwidth-graph.component';

describe('BandwidthGraphComponent', () => {
  let component: BandwidthGraphComponent;
  let fixture: ComponentFixture<BandwidthGraphComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BandwidthGraphComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BandwidthGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
