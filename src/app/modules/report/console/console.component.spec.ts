///<reference path="../../../../../node_modules/@types/jasmine/index.d.ts"/>
import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { Component, DebugElement, EventEmitter, Input, Output } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { ReportConsoleComponent } from './console.component';
import { Client } from '../../../services/api/client';
import { By } from '@angular/platform-browser';
import { clientMock } from '../../../../tests/client-mock.spec';
import { scrollServiceMock } from '../../../../tests/scroll-service-mock.spec';
import { MaterialMock } from '../../../../tests/material-mock.spec';
import { InfiniteScrollMock } from '../../../../tests/infinite-scroll-mock.spec';
import { MindsCardMock } from '../../../../tests/minds-card-mock.spec';
import { MindsCardCommentMock } from '../../../../tests/minds-card-comment-mock.spec';
import { FormsModule } from '@angular/forms';
import { ScrollService } from '../../../services/ux/scroll';
import {$it, $beforeAll, $beforeEach, $afterEach, $afterAll} from 'jasmine-ts-async';

import { REASONS, REPORT_ACTIONS } from '../../../services/list-options';
/* tslint:disable */
describe('ReportConsoleComponent', () => {
  let comp: ReportConsoleComponent;
  let fixture: ComponentFixture<ReportConsoleComponent>;
  let appeals: Array<any>;
  beforeEach(async(() => {

    TestBed.configureTestingModule({
      declarations: [ MaterialMock, InfiniteScrollMock, MindsCardMock, MindsCardCommentMock, ReportConsoleComponent], // declare the test component
      imports: [ FormsModule, RouterTestingModule ],
      providers: [
        { provide: Client, useValue: clientMock },
      ]
    })
      .compileComponents();  // compile template and css
  }));

  // synchronous beforeEach
  beforeEach((done) => {
    jasmine.MAX_PRETTY_PRINT_DEPTH = 10;
    jasmine.clock().uninstall();
    jasmine.clock().install();
    fixture = TestBed.createComponent(ReportConsoleComponent);
    clientMock.response = {};
    fixture.detectChanges();
    comp = fixture.componentInstance;
    appeals = [];
    clientMock.response[ `api/v1/entities/report/appeal/review` ] = {
      "status":"success",
      "load-next":'',
      "data":[
        {"guid":"756593195889987599","entity_guid":"755121974073626627", "entityObj": { "type" : "comment"} },
        {"guid":"756593195889987599","entity_guid":"755121974073626627", "entityObj": { "type" : "comment"} },
        {"guid":"756593195889987599","entity_guid":"755121974073626627", "entityObj": { "type" : "comment"} }
      ]
    };

    if (fixture.isStable()) {
      done();
    } else {
      fixture.whenStable().then(() => {
        done();
      });
    }
  });

  afterEach(() => {
    jasmine.clock().uninstall();
  });

  it('should have 4 tabs', fakeAsync(() => {
    const tabs = fixture.debugElement.queryAll(By.css('.m-report-console--tabs .mdl-tabs__tab'));
    expect(tabs.length).toBe(4);
  }));

  it('should load appeal textarea if filter is review', fakeAsync(() => {
    const tabs = fixture.debugElement.queryAll(By.css('#appealContent'));
    expect(tabs).not.toBeNull();
  }));

  it("should load appeals", fakeAsync(() => {
    comp.load();
    tick();
    expect(clientMock.get.calls.mostRecent().args[1]).toEqual({ limit: 12, offset: ''});
    expect(comp.appeals.length).toBe(3);
    fixture.detectChanges();
    const items = fixture.debugElement.queryAll(By.css('.m-report-console--item'));
    expect(items.length).toBe(3);
  }));

  it("should load appeals, and refresh", fakeAsync(() => {
    comp.load();
    tick();
    expect(clientMock.get.calls.mostRecent().args[1]).toEqual({ limit: 12, offset: ''});
    expect(comp.appeals.length).toBe(3);
    comp.load(true);
    tick();
    expect(clientMock.get.calls.mostRecent().args[1]).toEqual({ limit: 12, offset: ''});
    expect(comp.appeals.length).toBe(3);
  }));
  
});
