import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPlatformComponent } from './list-platform.component';
import { NgxLoadingModule } from 'ngx-loading';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { PlatformService } from '../platform.service';
import { faker } from '@faker-js/faker';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import {Platform} from "../platform";
import { PlatformModule } from '../platform.module';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

describe('ListPlatformComponent', () => {
  let component: ListPlatformComponent;
  let fixture: ComponentFixture<ListPlatformComponent>;
  let debug: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListPlatformComponent ],
      imports: [HttpClientModule, NgxLoadingModule, FormsModule, PlatformModule],
      providers: [PlatformService, NgbModal, NgbActiveModal],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListPlatformComponent);
    component = fixture.componentInstance;
    for (let i = 0; i < 10; i++) {

      let platform = Platform.fromAllAttributesInstance(
        `${i}`,
        faker.random.word(),
        faker.image.imageUrl(),
      );

      component.platforms.push(platform);
      component.platformPerPage = 10;
      component.getPageNumbers();
    }
    fixture.detectChanges();
    debug = fixture.debugElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should have 10 cards elements', () => {
    expect(debug.queryAll(By.css('div.card'))).toHaveSize(10);
  });

  it('should have 10 images elements', () => {
    expect(debug.queryAll(By.css('img'))).toHaveSize(10);
  });

  it('should have 10 cards body elements', () => {
    expect(debug.queryAll(By.css('div.card-body'))).toHaveSize(10);
  });

  it('should have the corresponding src to the platform url', () => {
    debug.queryAll(By.css('footer.blockquote-footer.fw-light')).forEach((footer, i) => {
      expect(footer.nativeElement.textContent).toEqual(
        component.platforms[i].url
      );
    });
  });

  it('should have blockquote tag with the platform name', () => {
    debug.queryAll(By.css('h4.pb-1.fw-bold')).forEach((h4, i) => {
      expect(h4.nativeElement.textContent).toContain(
        component.platforms[i].name
      );
    });
  });

  it('should search platform by name', () => {
    component.getPlatformByName(component.platforms[0].name);
    fixture.detectChanges();
    expect(component.platforms.length).toBeGreaterThan(0);
  });

  it('should sort platform by name', () => {
    component.showPopUpError();
    component.getPlatformByName(component.platforms[0].name);
    let sortedNames = component.platforms.map((platform) => platform.name).sort();
    component.isAscendingName = false;
    component.orderByName();

    component.isAscendingName = true;
    component.orderByName();
    fixture.detectChanges();
    expect(component.platforms[0].name).toEqual(sortedNames[0]);
  });
  it('should get_platform_list_success', () => {
    let service: PlatformService;
    let platforms = [];
    for (let i = 0; i < 10; i++) {

      let platform = Platform.fromAllAttributesInstance(
        `${i}`,
        faker.random.word(),
        faker.image.imageUrl(),
      );

      platforms.push(platform);
    }
    service = TestBed.inject(PlatformService);
    spyOn(service, 'getPlatform').and.returnValue(of(platforms));
    component.getPlatform();
    expect(component.platforms.length).toBe(10);
  });
  it('should execute_modal method', () => {

    const modalService = jasmine.createSpyObj('modalService', ['open']);

    const mockModalReference = {
      componentInstance: {
        refreshListActors: {
          subscribe: (callback: any) => {
            callback();
          }
        }
      }
    };


    modalService.open.and.returnValue(mockModalReference);

    component.openModalCreatePlatform();

    expect(modalService.open);
  });
});
