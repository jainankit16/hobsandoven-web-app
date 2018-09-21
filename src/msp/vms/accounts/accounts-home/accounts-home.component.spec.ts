import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { AccountsHomeComponent } from './accounts-home.component';

describe('AccountsHomeComponent', () => {
    let comp: AccountsHomeComponent;
    let fixture: ComponentFixture<AccountsHomeComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [AccountsHomeComponent],
            schemas: [NO_ERRORS_SCHEMA]
        });
        fixture = TestBed.createComponent(AccountsHomeComponent);
        comp = fixture.componentInstance;
    });

    it('can load  AccountsHomeComponent', () => {
        expect(comp).toBeTruthy();
    });
    it('should instantiate AccountsHomeComponent', () => {
        expect(fixture.componentInstance instanceof AccountsHomeComponent).toBe(true, 'should create AccountsHomeComponent');
    });

});
