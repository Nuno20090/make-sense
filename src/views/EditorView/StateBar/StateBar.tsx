import React from 'react';
import './StateBar.scss';
import {ImageData} from "../../../store/labels/types";
import {AppState} from "../../../store";
import {connect} from "react-redux";
import {LabelType} from "../../../data/enums/LabelType";

interface IProps {
    imagesData: ImageData[];
    activeLabelType: LabelType;
}

const StateBar: React.FC<IProps> = ({imagesData, activeLabelType}) => {

    const rectLabeledImages = imagesData.reduce((currentCount: number, currentImage: ImageData) => {
        return currentCount + (currentImage.labelRects.length > 0 ? 1 : 0);
    }, 0);

    const getProgress = () => {
        if (!imagesData || imagesData.length === 0) return 0;
        // LabelType currently only supports RECT in this build. Default to RECT behavior when applicable.
        if (activeLabelType === LabelType.RECT) return (100 * rectLabeledImages) / imagesData.length;
        return 0;
    };

    return (
        <div className="StateBar">
            <div
                style={{width: getProgress() + "%"}}
                className="done"
            />
        </div>
    );
};

const mapDispatchToProps = {};

const mapStateToProps = (state: AppState) => ({
    imagesData: state.labels.imagesData,
    activeLabelType: state.labels.activeLabelType
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(StateBar);