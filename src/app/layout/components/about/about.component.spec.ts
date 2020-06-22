
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AboutComponent } from './about.component';
import { ConfigOptionsService, ConstantsService, ConstantsServiceToken } from '../../../core';
import { of, defer } from 'rxjs';
import { ConfigOptionsModel } from '../../../core/models/config-options.model';

describe('AboutComponent', () => {
    const app = 'Application';
    const ver = '1.0.0';
    const configOptions = new ConfigOptionsModel(1, 'User', 'user@mail.com');
    let fixture: ComponentFixture<AboutComponent>;
    let titleEl: HTMLElement;
    let loginEl: HTMLElement;
    let emailEl: HTMLElement;
    let clearButtonEl: DebugElement;

    let getOptionsServiceSpy: jasmine.Spy;
    let clearOptionsServiceSpy: jasmine.Spy;

    beforeEach(() => {
        const configOptionsServiceSpyObj = jasmine.createSpyObj('ConfigOptionsService', ['getOptions', 'clearOptions']);
        const constantsService = new ConstantsService(app, ver);

        getOptionsServiceSpy = configOptionsServiceSpyObj.getOptions.and.returnValue(
          defer(() => of(configOptions))
        );

        clearOptionsServiceSpy = configOptionsServiceSpyObj.clearOptions;

        TestBed.configureTestingModule({
          declarations: [AboutComponent],
        }).overrideComponent(AboutComponent, {
            set: {
                providers: [
                    { provide: ConfigOptionsService, useValue: configOptionsServiceSpyObj },
                    { provide: ConstantsServiceToken, useValue: constantsService }
                ]
            }
        });

        fixture = TestBed.createComponent(AboutComponent);

        titleEl = fixture.debugElement.query(By.css('.title')).nativeElement;
        loginEl = fixture.debugElement.query(By.css('.login')).nativeElement;
        emailEl = fixture.debugElement.query(By.css('.email')).nativeElement;
        clearButtonEl = fixture.debugElement.query(By.css('.btn-warning'));

        fixture.detectChanges();
    });

    afterEach(() => {
        fixture.destroy();
    });
    it('should show title with constants from ConstantsService', async () => {
        expect(titleEl.textContent).toBe(`Application: ${app} (Version: ${ver})`);
    });

    it('should show config options after getOptions call of ConfigOptionsService', async () => {
        await fixture.whenStable();

        fixture.detectChanges();

        expect(loginEl.textContent).toBe(`Options login: ${configOptions.login}`);
        expect(emailEl.textContent).toBe(`Options email: ${configOptions.email}`);
    });

    it('should clear config options after clearButton clicked', async () => {
        await fixture.whenStable();

        fixture.detectChanges();

        clearButtonEl.triggerEventHandler('click', null);
        expect(clearOptionsServiceSpy).toHaveBeenCalled();
    });
});
