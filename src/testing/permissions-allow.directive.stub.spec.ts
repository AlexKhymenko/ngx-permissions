import { Component } from '@angular/core';
import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { NgxPermissionsAllowStubDirective } from './permissions-allow.directive.stub';

describe('Permissions stub testing only original template', () => {
    @Component({selector: 'test-comp',
        template: `<ng-template [ngxPermissionsExcept]="'ADMIN'"><div>123</div></ng-template>`})
    class TestComp {
        data: any;
    }

    let fixture: any;
    let comp;
    beforeEach(() => {
        TestBed.configureTestingModule({declarations: [TestComp, NgxPermissionsAllowStubDirective]});
        fixture = TestBed.createComponent(TestComp);
        comp = fixture.componentInstance;
    });

    it ('Should show the component', fakeAsync(() => {
        detectChanges(fixture);
        let content = fixture.debugElement.nativeElement.querySelector('div');

        expect(content).toBeTruthy();
        expect(content.innerHTML).toEqual('123');
    }));
});

describe('Permissions stub testing except template', () => {
    @Component({selector: 'test-comp',
        template: `<ng-template [ngxPermissionsExcept]="'ADMIN'"><div>123</div></ng-template>`})
    class TestComp {
        data: any;
    }

    let fixture: any;
    let comp;
    beforeEach(() => {
        TestBed.configureTestingModule({declarations: [TestComp, NgxPermissionsAllowStubDirective]});
        fixture = TestBed.createComponent(TestComp);
        comp = fixture.componentInstance;
    });

    it ('Should show the component', fakeAsync(() => {
        detectChanges(fixture);
        let content = fixture.debugElement.nativeElement.querySelector('div');

        expect(content).toBeTruthy();
        expect(content.innerHTML).toEqual('123');
    }));
});


describe('Permissions stub testing only then template', () => {
    @Component({selector: 'test-comp',
        template: `
            <div *ngxPermissionsOnly="['THEN_BLOCK']; else elseBlock; then thenBlock">
            </div>
            <ng-template #elseBlock>
                <div>else block</div>
            </ng-template>
            <ng-template #thenBlock>
                <div>123</div>
            </ng-template>
        `})
    class TestComp {
        data: any;
    }

    let fixture: any;
    let comp;
    beforeEach(() => {
        TestBed.configureTestingModule({declarations: [TestComp, NgxPermissionsAllowStubDirective]});
        fixture = TestBed.createComponent(TestComp);
        comp = fixture.componentInstance;
    });

    it ('Should show the component', fakeAsync(() => {
        detectChanges(fixture);
        let content = fixture.debugElement.nativeElement.querySelector('div');

        expect(content).toBeTruthy();
        expect(content.innerHTML).toEqual('123');
    }));
});


describe('Permissions stub testing except then template', () => {
    @Component({selector: 'test-comp',
        template: `
            <div *ngxPermissionsOnly="['THEN_BLOCK']; else elseBlock; then thenBlock">
            </div>
            <ng-template #elseBlock>
                <div>else block</div>
            </ng-template>
            <ng-template #thenBlock>
                <div>123</div>
            </ng-template>
        `})
    class TestComp {
        data: any;
    }

    let fixture: any;
    let comp;
    beforeEach(() => {
        TestBed.configureTestingModule({declarations: [TestComp, NgxPermissionsAllowStubDirective]});
        fixture = TestBed.createComponent(TestComp);
        comp = fixture.componentInstance;
    });

    it ('Should show the component', fakeAsync(() => {
        detectChanges(fixture);
        let content = fixture.debugElement.nativeElement.querySelector('div');

        expect(content).toBeTruthy();
        expect(content.innerHTML).toEqual('123');
    }));
});

describe('Permission stub directive should show when providing authorised strategy functions', () => {
    @Component({selector: 'test-comp',
        template: `
            <div *ngxPermissionsOnly="['THEN_BLOCK']; else elseBlock; then thenBlock; authorisedStrategy: 'disable'; unauthorisedStrategy: 'enable'">
            </div>
            <ng-template #elseBlock>
                <div>else block</div>
            </ng-template>
            <ng-template #thenBlock>
                <div>123</div>
            </ng-template>
        `})
    class TestComp {
        data: any;
    }

    let fixture: any;
    let comp;
    beforeEach(() => {
        TestBed.configureTestingModule({declarations: [TestComp, NgxPermissionsAllowStubDirective]});
        fixture = TestBed.createComponent(TestComp);
        comp = fixture.componentInstance;
    });

    it ('Should show the component', fakeAsync(() => {
        detectChanges(fixture);
        let content = fixture.debugElement.nativeElement.querySelector('div');

        expect(content).toBeTruthy();
        expect(content.innerHTML).toEqual('123');
    }));
});
function detectChanges(fixture) {
    tick();
    fixture.detectChanges();
}