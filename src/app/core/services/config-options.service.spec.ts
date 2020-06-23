import { ConfigOptionsService } from './config-options.service';
import { LocalStorageService } from './local-storage.service';
import { ConfigOptionsModel } from '../models/config-options.model';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';

describe('ConfigOptionsService', () => {
    it('getOptions from existing value of localStorageService', (done: DoneFn) => {
        const localStorageServiceSpy = jasmine.createSpyObj('LocalStorageService', ['getItem']);

        const stub = new ConfigOptionsModel(0, 'user', 'email');
        localStorageServiceSpy.getItem.withArgs(ConfigOptionsService.configOptionsKey).and.returnValue(stub);

        const service = new ConfigOptionsService(localStorageServiceSpy, null);
        service.getOptions().subscribe(options => {
            expect(options).toBe(stub);
            done();
        });
    });

    it('getOptions from empty localStorageService and set localStorageService from httpClient response', (done: DoneFn) => {
        const localStorageServiceSpy = jasmine.createSpyObj('LocalStorageService', ['getItem', 'setItem']);
        localStorageServiceSpy.getItem.withArgs(ConfigOptionsService.configOptionsKey).and.returnValue(null);

        const httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
        const stub = new ConfigOptionsModel(0, 'user', 'email');
        httpClientSpy.get.withArgs(ConfigOptionsService.appSettingUrl).and.returnValue(of(stub));

        const service = new ConfigOptionsService(localStorageServiceSpy, httpClientSpy);
        service.getOptions().subscribe(options => {
            expect(localStorageServiceSpy.setItem.calls.count()).toBe(1);
            expect(options).toBe(stub);
            done();
        });
    });
});
