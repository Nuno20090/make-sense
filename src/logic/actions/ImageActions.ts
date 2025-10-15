import { LabelStatus } from "../../data/enums/LabelStatus";
import { LabelType } from "../../data/enums/LabelType";
import { store } from "../../index";
import { EditorModel } from "../../staticModels/EditorModel";
import {
  updateActiveImageIndex,
  updateActiveLabelId,
  updateActiveLabelNameId,
  updateImageDataById,
} from "../../store/labels/actionCreators";
import {
  ImageData,
  LabelRect,
} from "../../store/labels/types";
import { LabelsSelector } from "../../store/selectors/LabelsSelector";
import { ViewPortActions } from "./ViewPortActions";

export class ImageActions {
  public static getPreviousImage(): void {
    const currentImageIndex: number = LabelsSelector.getActiveImageIndex();
    ImageActions.getImageByIndex(currentImageIndex - 1);
  }

  public static getNextImage(): void {
    const currentImageIndex: number = LabelsSelector.getActiveImageIndex();
    ImageActions.getImageByIndex(currentImageIndex + 1);
  }

  public static getImageByIndex(index: number): void {
    if (EditorModel.viewPortActionsDisabled) return;

    const imageCount: number = LabelsSelector.getImagesData().length;

    if (index < 0 || index > imageCount - 1) {
      return;
    } else {
      ViewPortActions.setZoom(1);
      store.dispatch(updateActiveImageIndex(index));
      store.dispatch(updateActiveLabelId(null));
    }
  }

  public static setActiveLabelOnActiveImage(labelIndex: number): void {
    const labelNames = LabelsSelector.getLabelNames();
    if (labelNames.length < labelIndex + 1) {
      return;
    }
    const imageData: ImageData = LabelsSelector.getActiveImageData();
    if (!imageData) return;
    store.dispatch(
      updateImageDataById(
        imageData.id,
        ImageActions.mapNewImageData(imageData, labelIndex)
      )
    );
    store.dispatch(updateActiveLabelNameId(labelNames[1].id));
  }

  private static mapNewImageData(
    imageData: ImageData,
    labelIndex: number
  ): ImageData {
    const labelType: LabelType = LabelsSelector.getActiveLabelType();
    const labelNames = LabelsSelector.getLabelNames();
    const newImageData: ImageData = {
      ...imageData,
    };
    switch (labelType) {
      case LabelType.RECT:
        {
          const rect = LabelsSelector.getActiveRectLabel();
          newImageData.labelRects = imageData.labelRects.map(
            (labelRectangle: LabelRect) => {
              if (labelRectangle.id === rect.id) {
                return {
                  ...labelRectangle,
                  labelId: labelNames[labelIndex].id,
                  status: LabelStatus.ACCEPTED,
                };
              }
              return labelRectangle;
            }
          );
          store.dispatch(updateActiveLabelId(rect.id));
        }
        break;
    }

    return newImageData;
  }
}
