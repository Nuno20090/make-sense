import classNames from "classnames";
import React from "react";
import { connect } from "react-redux";
import { ContextType } from "../../../../data/enums/ContextType";
import { EventType } from "../../../../data/enums/EventType";
import { LabelType } from "../../../../data/enums/LabelType";
import { ProjectType } from "../../../../data/enums/ProjectType";
import { ISize } from "../../../../interfaces/ISize";
import { ContextManager } from "../../../../logic/context/ContextManager";
import { Settings } from "../../../../settings/Settings";
import { AppState } from "../../../../store";
import { updateActiveLabelId, updateActiveLabelType, updateImageDataById } from "../../../../store/labels/actionCreators";
import { ImageData } from "../../../../store/labels/types";
import RectLabelsList from "../RectLabelsList/RectLabelsList";
import './LabelsToolkit.scss';

interface IProps {
    activeImageIndex: number,
    activeLabelType: LabelType;
    imagesData: ImageData[];
    projectType: ProjectType;
    updateImageDataById: (id: string, newImageData: ImageData) => any;
    updateActiveLabelType: (activeLabelType: LabelType) => any;
    updateActiveLabelId: (highlightedLabelId: string) => any;
}

interface IState {
    size: ISize;
}

class LabelsToolkit extends React.Component<IProps, IState> {
    private labelsToolkitRef: HTMLDivElement;
    private readonly tabs: LabelType[];

    constructor(props) {
        super(props);

        this.state = {
            size: null,
        };

        this.tabs = [
            LabelType.RECT,
        ];

        const activeTab: LabelType = props.activeLabelType ? props.activeLabelType : this.tabs[0];
        props.updateActiveLabelType(activeTab);
    }

    public componentDidMount(): void {
        this.updateToolkitSize();
        window.addEventListener(EventType.RESIZE, this.updateToolkitSize);
    }

    public componentWillUnmount(): void {
        window.removeEventListener(EventType.RESIZE, this.updateToolkitSize);
    }

    private updateToolkitSize = () => {
        if (!this.labelsToolkitRef)
            return;

        const listBoundingBox = this.labelsToolkitRef.getBoundingClientRect();
        this.setState({
            size: {
                width: listBoundingBox.width,
                height: listBoundingBox.height
            }
        })
    };

    private headerClickHandler = (activeTab: LabelType) => {
        console.log("Header click", activeTab);
        this.props.updateActiveLabelType(activeTab);
        this.props.updateActiveLabelId(null);
    };

    private renderChildren = () => {

        const { size } = this.state;
        const { activeImageIndex, imagesData, activeLabelType } = this.props;
        return this.tabs.reduce((children, labelType: LabelType, index: number) => {
            const isActive: boolean = labelType === activeLabelType;
            const activeTabContentHeight: number = size.height - this.tabs.length * Settings.TOOLKIT_TAB_HEIGHT_PX;
            const getClassName = (baseClass: string) => classNames(
                baseClass,
                {
                    "active": isActive,
                }
            );

            const content =
                <div
                    key={"Content_" + index}
                    className={getClassName("Content")}
                    style={{ height: isActive ? activeTabContentHeight : 0 }}
                >
                    {labelType === LabelType.RECT && imagesData && imagesData.length > 0 && imagesData[activeImageIndex] && <RectLabelsList
                        size={{
                            width: size.width - 20,
                            height: activeTabContentHeight - 20
                        }}
                        imageData={imagesData[activeImageIndex]}
                    />}

                </div>;

            children.push([content]);
            return children;
        }, [])
    };

    public render() {

        return (
            <div
                className="LabelsToolkit"
                ref={ref => this.labelsToolkitRef = ref}
                onClick={() => ContextManager.switchCtx(ContextType.RIGHT_NAVBAR)}
            >
                {this.state.size && this.renderChildren()}
            </div>
        )
    }
}

const mapDispatchToProps = {
    updateImageDataById,
    updateActiveLabelType,
    updateActiveLabelId
};

const mapStateToProps = (state: AppState) => ({
    activeImageIndex: state.labels.activeImageIndex,
    activeLabelType: state.labels.activeLabelType,
    imagesData: state.labels.imagesData,
    projectType: state.general.projectData.type,
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LabelsToolkit);