import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EditviewPage } from './editview.page';

describe('EditviewPage', () => {
  let component: EditviewPage;
  let fixture: ComponentFixture<EditviewPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditviewPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EditviewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
