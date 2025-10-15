import {Notification} from '../enums/Notification';

export type NotificationContent = {
    header: string;
    description: string;
}

export type ExportFormatDataMap = Record<Notification, NotificationContent>;

export const NotificationsDataMap: ExportFormatDataMap = {
    [Notification.EMPTY_LABEL_NAME_ERROR]: {
        header: 'Empty label name',
        description: "Looks like you didn't assign name to one of your labels. Unfortunately it is mandatory for " +
            'every label to have unique name value. Insert correct name or delete empty label and try again.'
    },
    [Notification.NON_UNIQUE_LABEL_NAMES_ERROR]: {
        header: 'Non unique label names',
        description: 'Looks like not all your label names are unique. Unique names are necessary to guarantee correct' +
            ' data export when you complete your work. Make your names unique and try again.'
    },
    [Notification.LABELS_FILE_UPLOAD_ERROR]: {
        header: 'Labels file was not uploaded',
        description: 'Looks like you forgot to upload text file containing list of detected classes names. We need ' +
            'it to map YOLOv5 model output to labels. Please re-upload all model files once again.'
    },
    [Notification.ANNOTATION_FILE_PARSE_ERROR]: {
        header: 'Annotation files could not be parsed',
        description: 'The contents of an annotation file is not valid JSON, CSV, or XML. Please fix the files ' +
            'selected to import and try again.',
    },
    [Notification.ANNOTATION_IMPORT_ASSERTION_ERROR]: {
        header: 'Annotation files did not contain valid data',
        description: 'Missing or invalid annotations provided during import. Please fix the files selected ' +
            'to import and try again.',
    },
    
}
