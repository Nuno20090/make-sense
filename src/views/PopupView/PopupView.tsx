import React from 'react';
import { connect } from 'react-redux';
import { PopupWindowType } from '../../data/enums/PopupWindowType';
import { AppState } from '../../store';
import { ClipLoader } from 'react-spinners';
import { CSSHelper } from '../../logic/helpers/CSSHelper';
import ExitProjectPopup from './ExitProjectPopup/ExitProjectPopup';
import ExportLabelPopup from './ExportLabelsPopup/ExportLabelPopup';
import ImportLabelPopup from './ImportLabelPopup/ImportLabelPopup';
import InsertLabelNamesPopup from './InsertLabelNamesPopup/InsertLabelNamesPopup';
import LoadMoreImagesPopup from './LoadMoreImagesPopup/LoadMoreImagesPopup';
import SuggestLabelNamesPopup from './SuggestLabelNamesPopup/SuggestLabelNamesPopup';

import './PopupView.scss';

interface IProps {
    activePopupType: PopupWindowType;
}

const PopupView: React.FC<IProps> = ({ activePopupType }) => {

    const selectPopup = () => {
        switch (activePopupType) {
            //case PopupWindowType.LOAD_LABEL_NAMES:
            //    return <LoadLabelsPopup />;
            case PopupWindowType.EXPORT_ANNOTATIONS:
                return <ExportLabelPopup />;
            case PopupWindowType.IMPORT_ANNOTATIONS:
                return <ImportLabelPopup />;
            case PopupWindowType.INSERT_LABEL_NAMES:
                return <InsertLabelNamesPopup
                    isUpdate={false}
                />;
            case PopupWindowType.UPDATE_LABEL:
                return <InsertLabelNamesPopup
                    isUpdate={true}
                />;
            case PopupWindowType.EXIT_PROJECT:
                return <ExitProjectPopup />;
            case PopupWindowType.IMPORT_IMAGES:
                return <LoadMoreImagesPopup />;
            //case PopupWindowType.LOAD_AI_MODEL:
            //    return <LoadModelPopup />;
            //case PopupWindowType.LOAD_YOLO_V5_MODEL:
            //    return <LoadYOLOv5ModelPopup />;
            //case PopupWindowType.CONNECT_AI_MODEL_VIA_API:
            //    return <ConnectInferenceServerPopup />;
            case PopupWindowType.SUGGEST_LABEL_NAMES:
                return <SuggestLabelNamesPopup />;
            case PopupWindowType.LOADER:
                return <ClipLoader
                    size={50}
                    color={CSSHelper.getLeadingColor()}
                    loading={true}
                />;
            default:
                return null;
        }
    };

    return (
        activePopupType && <div className='PopupView'>
            {selectPopup()}
        </div>
    );
};

const mapStateToProps = (state: AppState) => ({
    activePopupType: state.general.activePopupType
});

export default connect(
    mapStateToProps
)(PopupView);
