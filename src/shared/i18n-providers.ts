/*
 *    Project:	sg-pro - sg-pro
 *    Version:	1.0.0
 *    Date:		Sep 30, 2017 9:50:57 AM
 *    Author:	anjani 
 *
 *    Coded with Netbeans!
 */

import {TRANSLATIONS, TRANSLATIONS_FORMAT, LOCALE_ID} from '@angular/core';

declare var System: any;

interface TranslationFileContent {
    Translation: string;
}

export function getTranslationProviders(): Promise<Object[]> {

    // Set your locale here or get it from somewhere (e.g. localStorage)
    let locale: string = localStorage.getItem('localeId');
    const noProviders: Object[] = [];

    if (!locale || locale === 'en-US') {

        return Promise.resolve(noProviders);
    }
    else {
        return System.import(`../locale/messages.${locale}.ts`)
            .then((translations: TranslationFileContent) => {
                return createProviders(translations, locale);
            })
            .catch(() => noProviders);
    }

}

function createProviders(translations: TranslationFileContent, locale: string) {
    return [
        {provide: TRANSLATIONS, useValue: translations.Translation},
        {provide: TRANSLATIONS_FORMAT, useValue: 'xlf'},
        {provide: LOCALE_ID, useValue: locale}
    ];
}
