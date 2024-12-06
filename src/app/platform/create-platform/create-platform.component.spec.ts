import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePlatformComponent } from './create-platform.component';
import { HttpClientModule } from '@angular/common/http';
import { NgxLoadingModule } from 'ngx-loading';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbActiveModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { PlatformService } from '../platform.service';
import { faker } from '@faker-js/faker';
import { of, throwError } from 'rxjs';
import {Platform} from "../platform";
import { PlatformModule } from '../platform.module';

describe('CreatePlatformComponent', () => {
  let component: CreatePlatformComponent;
  let fixture: ComponentFixture<CreatePlatformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatePlatformComponent ],
      imports: [HttpClientModule, NgxLoadingModule, ReactiveFormsModule, FormsModule, NgbModule, PlatformModule],
      providers: [NgbActiveModal, PlatformService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatePlatformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('test successful construction of the form', () => {
    const form = component.platformForm;
    expect(form).toBeDefined();
  });
  it('test empty values ​​on the form', () => {
    const form = component.platformForm;
    const nameControl = form.controls['name'];
    nameControl.setValue('');
    expect(nameControl).toBeDefined();
    expect(nameControl.valid).toBeFalsy();

    const urlControl = form.controls['url'];
    urlControl.setValue('');
    expect(urlControl).toBeDefined();
    expect(urlControl.valid).toBeFalsy();

  });
  it('test invalid url form', () => {
    const form = component.platformForm;

    const urlControl = form.controls['url'];
    urlControl.setValue(faker.random.word());
    expect(urlControl).toBeDefined();
    expect(urlControl.valid).toBeFalsy();

  });
  it('test invalid lenght fields', () => {
    const form = component.platformForm;

    let value = '';
    for (let index = 0; index < 260; index++) {
      value += faker.lorem.word();

    }

    const nameControl = form.controls['name'];
    nameControl.setValue(value);
    expect(nameControl).toBeDefined();
    expect(nameControl.valid).toBeFalsy();

    const photoControl = form.controls['url'];
    photoControl.setValue(value);
    expect(photoControl).toBeDefined();
    expect(photoControl.valid).toBeFalsy();

  });
  it('test valid fields values', () => {
    const form = component.platformForm;

    let value = faker.lorem.word();

    const nameControl = form.controls['name'];
    nameControl.setValue(value);
    expect(nameControl).toBeDefined();
    expect(nameControl.valid).toBeTruthy();

  });
  it('test create actor', () => {
    let service: PlatformService;

    let platform = Platform.fromAllAttributesInstance(
      '1',
      faker.random.word(),
      faker.internet.url()
    );
   service = TestBed.inject(PlatformService);
   spyOn(service, 'createPlatform').and.returnValue(of(platform));

    expect(() => {
      component.createPlatform(platform);
    }).not.toThrow();
  });
  it('test error create actor', () => {
    let service: PlatformService;

    let platform = Platform.fromAllAttributesInstance(
      '1',
      faker.random.word(),
      faker.internet.url()
    );
   service = TestBed.inject(PlatformService);
   const error = 'Error message';

   spyOn(service, 'createPlatform').and.returnValue(throwError(() => error));

    expect(() => {
      component.createPlatform(platform);
    }).not.toThrow();
  });
  it('close pop up', () => {
    expect(() => {
      component.closePopup();
    }).not.toThrow();
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
