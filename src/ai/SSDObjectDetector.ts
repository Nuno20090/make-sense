// TensorFlow-based object detection removed. Provide a no-op stub to preserve API.
import {DetectedObject} from '../interfaces/StubDetectedObject';
import {store} from '../index';
import {updateSSDObjectDetectorStatus} from '../store/ai/actionCreators';
import {LabelType} from '../data/enums/LabelType';
import {LabelsSelector} from '../store/selectors/LabelsSelector';
import {AISSDObjectDetectionActions} from '../logic/actions/AISSDObjectDetectionActions';
import {updateActiveLabelType} from '../store/labels/actionCreators';
import {submitNewNotification} from '../store/notifications/actionCreators';
import {NotificationUtil} from '../utils/NotificationUtil';
import {NotificationsDataMap} from '../data/info/NotificationsData';
import {Notification} from '../data/enums/Notification';

export class SSDObjectDetector {
    // No-op implementation: model functionality removed but API preserved.
    public static loadModel(callback?: () => any) {
        store.dispatch(updateSSDObjectDetectorStatus(false));
        if (callback) callback();
    }

    public static predict(_image: HTMLImageElement, callback?: (predictions: DetectedObject[]) => any) {
        // Return empty prediction list
        if (callback) callback([]);
    }
}
