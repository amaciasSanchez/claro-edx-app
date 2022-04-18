import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Home2ecsComponent } from './home2ecs.component';

describe('Home2ecsComponent', () => {
  let component: Home2ecsComponent;
  let fixture: ComponentFixture<Home2ecsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Home2ecsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Home2ecsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
