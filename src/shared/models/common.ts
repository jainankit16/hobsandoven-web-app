export interface IAlert {
    type: string;
    message: string;
}

export enum AlertType {
    Success,
    Error,
    Info,
    Warning
}

export interface ValueList {
    value: string;
    label: string;
}

export interface StageList {
    id: number;
    value: string;
    label: string;
}
