import {HotKeyAction} from "../../data/HotKeyAction";
import {EditorModel} from "../../staticModels/EditorModel";
import {LabelType} from "../../data/enums/LabelType";
import {EditorData} from "../../data/EditorData";
import {EditorActions} from "../actions/EditorActions";
import {BaseContext} from "./BaseContext";
import {ImageActions} from "../actions/ImageActions";
import {ViewPortActions} from "../actions/ViewPortActions";
import {Direction} from "../../data/enums/Direction";
import {LabelActions} from "../actions/LabelActions";

export class EditorContext extends BaseContext {
    public static actions: HotKeyAction[] = [
        {
            keyCombo: ["Control", "ArrowLeft"],
            action: (event: KeyboardEvent) => {
                ImageActions.getPreviousImage()
            }
        },
        {
            keyCombo: ["Control", "ArrowRight"],
            action: (event: KeyboardEvent) => {
                ImageActions.getNextImage();
            }
        },
        {
            keyCombo: ["Control", "+"],
            action: (event: KeyboardEvent) => {
                ViewPortActions.zoomIn();
            }
        },
        {
            keyCombo: ["Control", "-"],
            action: (event: KeyboardEvent) => {
                ViewPortActions.zoomOut();
            }
        },
        {
            keyCombo: ["ArrowRight"],
            action: (event: KeyboardEvent) => {
                event.preventDefault();
                ViewPortActions.translateViewPortPosition(Direction.RIGHT);
            }
        },
        {
            keyCombo: ["ArrowLeft"],
            action: (event: KeyboardEvent) => {
                event.preventDefault();
                ViewPortActions.translateViewPortPosition(Direction.LEFT);
            }
        },
        {
            keyCombo: ["ArrowUp"],
            action: (event: KeyboardEvent) => {
                event.preventDefault();
                ViewPortActions.translateViewPortPosition(Direction.BOTTOM);
            }
        },
        {
            keyCombo: ["ArrowDown"],
            action: (event: KeyboardEvent) => {
                event.preventDefault();
                ViewPortActions.translateViewPortPosition(Direction.TOP);
            }
        },
        {
            keyCombo: ["Delete"],
            action: (event: KeyboardEvent) => {
                LabelActions.deleteActiveLabel();
            }
        },
        {
            keyCombo: ["Control", "0"],
            action: (event: KeyboardEvent) => {
                ImageActions.setActiveLabelOnActiveImage(0);
                EditorActions.fullRender();
            }
        },
        {
            keyCombo: ["Control", "1"],
            action: (event: KeyboardEvent) => {
                ImageActions.setActiveLabelOnActiveImage(1);
                EditorActions.fullRender();
            }
        },
        {
            keyCombo: ["Control", "2"],
            action: (event: KeyboardEvent) => {
                ImageActions.setActiveLabelOnActiveImage(2);
                EditorActions.fullRender();
            }
        },
        {
            keyCombo: ["Control", "3"],
            action: (event: KeyboardEvent) => {
                ImageActions.setActiveLabelOnActiveImage(3);
                EditorActions.fullRender();
            }
        },
        {
            keyCombo: ["Control", "4"],
            action: (event: KeyboardEvent) => {
                ImageActions.setActiveLabelOnActiveImage(4);
                EditorActions.fullRender();
            }
        },
        {
            keyCombo: ["Control", "5"],
            action: (event: KeyboardEvent) => {
                ImageActions.setActiveLabelOnActiveImage(5);
                EditorActions.fullRender();
            }
        },
        {
            keyCombo: ["Control", "6"],
            action: (event: KeyboardEvent) => {
                ImageActions.setActiveLabelOnActiveImage(6);
                EditorActions.fullRender();
            }
        },
        {
            keyCombo: ["Control", "7"],
            action: (event: KeyboardEvent) => {
                ImageActions.setActiveLabelOnActiveImage(7);
                EditorActions.fullRender();
            }
        },
        {
            keyCombo: ["Control", "8"],
            action: (event: KeyboardEvent) => {
                ImageActions.setActiveLabelOnActiveImage(8);
                EditorActions.fullRender();
            }
        },
        {
            keyCombo: ["Control", "9"],
            action: (event: KeyboardEvent) => {
                ImageActions.setActiveLabelOnActiveImage(9);
                EditorActions.fullRender();
            }
        }
    ];
}