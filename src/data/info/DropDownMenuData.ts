import {updateActivePopupType} from '../../store/general/actionCreators';
import {PopupWindowType} from '../enums/PopupWindowType';
import {store} from '../../index';
import { updateImageData, updateActiveImageIndex } from '../../store/labels/actionCreators';
import { ImageRepository } from '../../logic/imageRepository/ImageRepository';

export type DropDownMenuNode = {
    name: string
    description?: string
    imageSrc: string
    imageAlt: string
    disabled: boolean
    onClick?: () => void
    children?: DropDownMenuNode[]
}

export const DropDownMenuData: DropDownMenuNode[] = [
    {
        name: 'Actions',
        imageSrc: 'ico/actions.png',
        imageAlt: 'actions',
        disabled: false,
        children: [
            {
                name: 'Editar Lista de Defeitos',
                description: 'Modificar lista de defeitos',
                imageSrc: 'ico/tags.png',
                imageAlt: 'labels',
                disabled: false,
                onClick: () => store.dispatch(updateActivePopupType(PopupWindowType.UPDATE_LABEL))
            },
            {
                name: 'Importar Imagens',
                description: 'Importar mais imagens',
                imageSrc: 'ico/camera.png',
                imageAlt: 'images',
                disabled: false,
                onClick: () => store.dispatch(updateActivePopupType(PopupWindowType.IMPORT_IMAGES))
            },
            {
                name: 'DEBUG: Delete all images',
                description: 'DEBUG: Delete all images',
                imageSrc: 'ico/camera.png',
                imageAlt: 'images',
                disabled: false,
                onClick: () => {
                    // Clear images from store and repository
                    store.dispatch(updateImageData([]));
                    store.dispatch(updateActiveImageIndex(null));
                    ImageRepository.clear();
                }
            }
        ]
    }
]

