import { ValueList, StageList } from './common';

export const JobStatusInternalValues: ValueList[] = [
    { value: 'Invited', label: 'Invited' },
    { value: 'Declined', label: 'Declined' },
    { value: 'Accepted', label: 'Accepted' },
    { value: 'Assigned', label: 'Assigned' },
    { value: 'Started', label: 'Started' },
    { value: 'Delivered', label: 'Delivered' },
    { value: 'Completed', label: 'Completed' },
    { value: 'Invoiced', label: 'Invoiced' },
    { value: 'Paid', label: 'Paid' },
    { value: 'Closed', label: 'Closed' },
    { value: 'Canceled', label: 'Canceled' }
];

export const DispatchServiceResolutionStatuses: ValueList[] = [
    { value: 'New', label: 'New' },
    { value: 'In-Progress', label: 'In-Progress' },
    { value: 'Resolved', label: 'Resolved' },
    { value: 'Closed', label: 'Closed' }
];

export const VisitIncompleteReasonCodes: ValueList[] = [
    { value: 'Customer not ready', label: 'Customer not ready' },
    { value: 'Customer rejected', label: 'Customer rejected' },
    { value: 'Emergency', label: 'Emergency' },
    { value: 'Missing Part', label: 'Missing Part' },
    { value: 'Missing Tool', label: 'Missing Tool' },
    { value: 'No access', label: 'No access' },
    { value: 'Weather hazard', label: 'Weather hazard' },
    { value: 'Other', label: 'Other' }
];

export const AppointmentScheduleCustomStatuses: ValueList[] = [
    { value: 'No or Phone Scheduling (1st Attempt)', label: 'No or Phone Scheduling (1st Attempt)' },
    { value: 'No or Phone Scheduling (2nd Attempt)', label: 'No or Phone Scheduling (2nd Attempt)' },
    { value: 'No or Phone Scheduling (3rd Attempt)', label: 'No or Phone Scheduling (3rd Attempt)' },
    { value: 'Other (Visit-not-Required)', label: 'Other (Visit-not-Required)' },
    { value: 'Yes', label: 'Yes' }
];

export const BackgroundColorCodes = [
    '#cfecfe',
    '#f6f6f6',
    '#f1effd',
    '#cfecfe',
    '#e8fdeb',
    '#efd3e7',
    '#c1dad6',
    '#f5fafa',
    '#acd1e9'
];

export const MessageTypes: ValueList[] = [
    { value: 'dispatch-planner', label: 'Manager - Dispatch Planner' },
    { value: 'worker-visit-status', label: 'Work Status - Visit Update & Deliverables' },
    { value: 'pricing', label: 'Pricing - Service Quote & Price Book' },
    { value: 'billing', label: 'Billing - PO, Timecard, Invoice & Payment' }
];

export const JobStages: StageList[] = [
    { id: 1, value: 'invited', label: 'Invited' },
    { id: 2, value: 'accepted', label: 'Accepted' },
    { id: 3, value: 'assigned', label: 'Assigned' },
    { id: 4, value: 'started', label: 'Started' },
    { id: 5, value: 'pending', label: 'Pending' },
    { id: 6, value: 'invoiced', label: 'Invoiced' },
    { id: 7, value: 'paid', label: 'Paid' },
    { id: 8, value: 'closed', label: 'Closed' }
];


export const ServiceType: ValueList[] = [
    { value: 'Break/Fix Service', label: 'Break/Fix Service' },
    { value: 'Desk-side Support', label: 'Desk-side Support' },
    { value: 'IMAC', label: 'IMAC' }
];

export const PaymentStatus: ValueList[] = [
    { value: 'Completed', label: 'Completed' },
    { value: 'Submitted', label: 'In-Progress' },
    { value: 'failed', label: 'failed' }
];

export const TimecardApprovedStatus: ValueList[] = [
    { value: 'Approved', label: 'Approved' },
    { value: 'Decline', label: 'Decline' },
    { value: 'Not Submitted', label: 'Not Submitted' },
];
export const TimecardFinalVisit: ValueList[] = [
    { value: 'true', label: 'Yes' },
    { value: 'false', label: 'No' }
];

export const ModelNames: ValueList[] = [
    { value: 'Job', label: 'Job' },
    { value: 'Case', label: 'Case' },
    { value: 'Account', label: 'Account' },
    { value: 'Worker', label: 'Worker' },
    { value: 'Program', label: 'Program' },
    { value: 'Project', label: 'Project' }
];

export const FileType = [
    { group: 'image', value: 'image/jpg', label: 'jpg' },
    { group: 'image', value: 'image/jpeg', label: 'jpeg' },
    { group: 'image', value: 'image/png', label: 'png' },
    { group: 'image', value: 'image/bmp', label: 'bmp' },
    { group: 'image', value: 'image/gif', label: 'gif' },
    { group: 'image', value: 'image/webp', label: 'webp' },
    { group: 'image', value: 'image/svg+xml', label: 'svg' },
    { group: 'text', value: 'text/plain', label: 'plainText' },
    { group: 'text', value: 'text/html', label: 'html' },
    { group: 'text', value: 'text/css', label: 'css' },
    { group: 'text', value: 'text/javascript', label: 'plain' },
    { group: 'text', value: 'text/x-log', label: 'X-log' },
    { group: 'application', value: 'application/octet-stream', label: 'octet-stream' },
    { group: 'application', value: 'application/pkcs12', label: 'pkcs12' },
    { group: 'application', value: 'application/vnd.mspowerpoint', label: 'mspowerpoint' },
    { group: 'application', value: 'application/xhtml+xml', label: 'xhtml+xml' },
    { group: 'application', value: 'application/xml', label: 'xml' },
    { group: 'application', value: 'application/pdf', label: 'pdf' },
    { group: 'application', value: 'application/vnd.oasis.opendocument.text', label: 'opendocument-text' },
    { group: 'application', value: 'application/vnd.ms-powerpoint', label: 'ms-powerpoint' },
    { group: 'application', value: 'application/msword', label: 'ms-word' },
    { group: 'application', value: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', label: 'document' },
    { group: 'application', value: 'application/vnd.oasis.opendocument.presentation', label: 'opendocument-presentation' },
    { group: 'application', value: 'application/vnd.openxmlformats-officedocument.presentationml.presentation', label: 'presentation' },
    { group: 'application', value: 'application/vnd.ms-excel', label: 'MS-excel' },
    { group: 'application', value: 'application/vnd.oasis.opendocument.spreadsheet', label: 'Opendocument-spreadsheet' },
    { group: 'application', value: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', label: 'spreadsheetml-sheet' },
    { group: 'application', value: 'application/rtf', label: 'RTF' },
    { group: 'audio', value: 'audio/midi', label: 'midi' },
    { group: 'audio', value: 'audio/mpeg', label: 'mpeg' },
    { group: 'audio', value: 'audio/webm', label: 'webm' },
    { group: 'audio', value: 'audio/ogg', label: 'ogg' },
    { group: 'audio', value: 'audio/wav', label: 'wav' },
    { group: 'video', value: 'video/webm', label: 'webm' },
    { group: 'video', value: 'video/ogg', label: 'ogg' }
]

export const FileTypeGroup = [
    { value: 'image/jpg;image/jpeg;image/png;image/bmp;image/gif;image/webp;image/svg+xml', label: 'image' },
    { value: 'text/plain;text/html;text/css;text/javascript;text/x-log', label: 'text' },
    {
        value: 'application/octet-stream;application/pkcs12;application/vnd.mspowerpoint;application/xhtml+xml;application/xml;application/pdf;' +
            'application/vnd.oasis.opendocument.text;application/vnd.ms-powerpoint;application/msword;application/vnd.openxmlformats-officedocument.wordprocessingml.document;' +
            'application/vnd.oasis.opendocument.presentation;application/vnd.openxmlformats-officedocument.presentationml.presentation;' +
            'application/vnd.ms-excel;application/vnd.oasis.opendocument.spreadsheet;application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;' +
            'application/rtf', label: 'application'
    },
    { value: 'audio/midi;audio/mpeg;audio/webm;audio/ogg;audio/wav', label: 'audio' },
    { value: 'video/webm;video/ogg', label: 'video' },

]

export const ViewTypes = [
    {
        idx: 1,
        label: 'Jobsites View',
        value: 'jobsiteView',
        folderHiearchy: [
            {
                level: 'one',
                model: 'Account',
                loadFiles: false,
                loadFilesForModel: '',
                isUploadDisabled: true,
                isDetailDisabled: false
            },
            {
                level: 'two',
                model: 'Program',
                loadFiles: true,
                loadFilesForModel: 'Account',
                isUploadDisabled: false,
                isDetailDisabled: false
            },
            {
                level: 'three',
                model: 'Project',
                loadFiles: true,
                loadFilesForModel: 'Program',
                isUploadDisabled: false,
                isDetailDisabled: false
            },
            {
                level: 'four',
                model: 'static',
                loadFiles: false,
                loadFilesForModel: 'Project',
                isUploadDisabled: false,
                isDetailDisabled: true
            },
            {
                level: 'five',
                model: 'Job',
                loadFiles: false,
                loadFilesForModel: '',
                isUploadDisabled: true,
                isDetailDisabled: false
            },
            {
                level: 'five',
                model: 'Case',
                loadFiles: false,
                loadFilesForModel: '',
                isUploadDisabled: true,
                isDetailDisabled: false
            },
            {
                level: 'six',
                model: 'Document',
                loadFiles: true,
                loadFilesForModel: '',
                isUploadDisabled: false,
                isDetailDisabled: false
            }
        ]
    },
    {
        idx: 2,
        label: 'Department View',
        value: 'departmentView',
        folderHiearchy: [
            {
                level: 'one',
                model: 'Account',
                loadFiles: false,
                loadFilesForModel: '',
                isUploadDisabled: true,
                isDetailDisabled: false
            },
            {
                level: 'two',
                model: 'Program',
                loadFiles: true,
                loadFilesForModel: 'Account',
                isUploadDisabled: false,
                isDetailDisabled: false
            },
            {
                level: 'three',
                model: 'static',
                loadFiles: false,
                loadFilesForModel: '',
                isUploadDisabled: true,
                isDetailDisabled: true
            },
            {
                level: 'four',
                model: 'Project',
                loadFiles: true,
                loadFilesForModel: 'Program',
                isUploadDisabled: false,
                isDetailDisabled: false
            },
            {
                level: 'five',
                model: 'Job',
                loadFiles: false,
                loadFilesForModel: 'Project',
                isUploadDisabled: false,
                isDetailDisabled: false
            },
            {
                level: 'five',
                model: 'Case',
                loadFiles: false,
                loadFilesForModel: 'Project',
                isUploadDisabled: false,
                isDetailDisabled: false
            },
            {
                level: 'six',
                model: 'Document',
                loadFiles: true,
                loadFilesForModel: '',
                isUploadDisabled: false,
                isDetailDisabled: false
            }
        ]
    }
]
