import { LabelsActionTypes, LabelsState, ImageData } from './types';
import { Action } from '../Actions';
import { LabelUtil } from '../../utils/LabelUtil';

// Default label names provided by user

interface DefaultLabel {
    id: string;
    name: string;
    index: number;
}

const DEFAULT_LABEL_NAMES: DefaultLabel[] = [
    {
        id: '00000000-0000-0000-0000-000000000001',
        name: 'Defeitos de barrado',
        index: 0,
    },
    {
        id: '00000000-0000-0000-0000-000000000002',
        name: 'Contaminação',
        index: 1,
    },
    {
        id: '00000000-0000-0000-0000-000000000003',
        name: 'Falha da agulha',
        index: 2,
    },
    {
        id: '00000000-0000-0000-0000-000000000004',
        name: 'Sujidade',
        index: 3,
    },
    {
        id: '00000000-0000-0000-0000-000000000005',
        name: 'Buraco',
        index: 4,
    },
    {
        id: '00000000-0000-0000-0000-000000000006',
        name: 'Emenda',
        index: 5,
    },
    {
        id: '00000000-0000-0000-0000-000000000007',
        name: 'Óleo',
        index: 6,
    },
    {
        id: '00000000-0000-0000-0000-000000000008',
        name: 'Vincos',
        index: 7,
    },
    {
        id: '00000000-0000-0000-0000-000000000009',
        name: 'Apertos',
        index: 8,
    },
    {
        id: '00000000-0000-0000-0000-000000000010',
        name: 'Fibras salientes',
        index: 9,
    },
    {
        id: '00000000-0000-0000-0000-000000000011',
        name: 'Festos',
        index: 10,
    },
    {
        id: '00000000-0000-0000-0000-000000000012',
        name: 'Falha de lycra',
        index: 11,
    },
    {
        id: '00000000-0000-0000-0000-000000000013',
        name: 'Falha rapport',
        index: 12,
    },
    {
        id: '00000000-0000-0000-0000-000000000014',
        name: 'Sobreposição',
        index: 13,
    },
    {
        id: '00000000-0000-0000-0000-000000000015',
        name: 'Degradée',
        index: 14,
    },
];

const initialState: LabelsState = {
    activeImageIndex: null,
    activeLabelNameId: '00000000-0000-0000-0000-000000000001',
    activeLabelType: null,
    activeLabelId: null,
    highlightedLabelId: null,
    imagesData: [],
    firstLabelCreatedFlag: false,
    labels: DEFAULT_LABEL_NAMES.map((label: DefaultLabel) => LabelUtil.createLabelNameDefault(label.index, label.id, label.name))
};

export function labelsReducer(
    state = initialState,
    action: LabelsActionTypes
): LabelsState {
    switch (action.type) {
        case Action.UPDATE_ACTIVE_IMAGE_INDEX: {
            return {
                ...state,
                activeImageIndex: action.payload.activeImageIndex
            }
        }
        case Action.UPDATE_ACTIVE_LABEL_NAME_ID: {
            return {
                ...state,
                activeLabelNameId: action.payload.activeLabelNameId
            }
        }
        case Action.UPDATE_ACTIVE_LABEL_ID: {
            return {
                ...state,
                activeLabelId: action.payload.activeLabelId
            }
        }
        case Action.UPDATE_HIGHLIGHTED_LABEL_ID: {
            return {
                ...state,
                highlightedLabelId: action.payload.highlightedLabelId
            }
        }
        case Action.UPDATE_ACTIVE_LABEL_TYPE: {
            return {
                ...state,
                activeLabelType: action.payload.activeLabelType
            }
        }
        case Action.UPDATE_IMAGE_DATA_BY_ID: {
            return {
                ...state,
                imagesData: state.imagesData.map((imageData: ImageData) =>
                    imageData.id === action.payload.id ? action.payload.newImageData : imageData
                )
            }
        }
        case Action.ADD_IMAGES_DATA: {
            return {
                ...state,
                imagesData: state.imagesData.concat(action.payload.imageData)
            }
        }
        case Action.UPDATE_IMAGES_DATA: {
            return {
                ...state,
                imagesData: action.payload.imageData
            }
        }
        case Action.UPDATE_LABEL_NAMES: {
            return {
                ...state,
                labels: action.payload.labels
            }
        }
        case Action.UPDATE_FIRST_LABEL_CREATED_FLAG: {
            return {
                ...state,
                firstLabelCreatedFlag: action.payload.firstLabelCreatedFlag
            }
        }
        default:
            return state;
    }
}
