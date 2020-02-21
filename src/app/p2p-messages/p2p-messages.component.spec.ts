import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { P2pMessagesComponent } from './p2p-messages.component';

describe('P2pMessagesComponent', () => {
  let component: P2pMessagesComponent;
  let fixture: ComponentFixture<P2pMessagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ P2pMessagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(P2pMessagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
