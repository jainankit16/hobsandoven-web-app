export interface user {
    id: number;
    name: string;
    pic: string;
}

export interface wizardstep {
    name: string;
    title: string;
    link: string;
}


export class programTypes {
    'isExisting': boolean;
    'programSFId': string;
    'programName': string;
    'programReferCode': string;
}

export class Quote {
    'quoteNo': string;
    'revision': string;
    'quoteName': string
}

export class userProgress {
    'program': programTypes;
    'quote': Quote
}

interface mapDataType {
    lat: number;
    lng: number;
    icon: string;
}



