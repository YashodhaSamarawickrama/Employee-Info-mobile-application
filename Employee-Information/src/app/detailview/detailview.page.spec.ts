import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DetailviewPage } from './detailview.page';

describe('DetailviewPage', () => {
  let component: DetailviewPage;
  let fixture: ComponentFixture<DetailviewPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailviewPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DetailviewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
