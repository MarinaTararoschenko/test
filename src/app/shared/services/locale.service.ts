import { Injectable } from '@angular/core';
import { getLocaleCurrencySymbol, getLocaleCurrencyName } from '@angular/common';

@Injectable()
export class LocaleService {

    public locale: string;
    public symbol: string | null;
    public currencyName: any;

    TLD = 'cl';

    constructor(
    ) {
        this.locale = this.getLocale(this.TLD);
        this.symbol = getLocaleCurrencySymbol(this.locale);
        this.currencyName = getLocaleCurrencyName(this.locale);
    }

    getLocale(tld: string): string {
        const TLD = tld.toLowerCase();
        if (TLD === 'net') {
            return 'en-US';
        } else if (TLD === 'cl' || TLD === 'ar' || TLD === 'mx' ||
            TLD === 'ec' || TLD === 'co' || TLD === 'pe') {
            return 'es-' + (TLD.toUpperCase());
        } else {
            return 'es-CL';
        }
    }
}
