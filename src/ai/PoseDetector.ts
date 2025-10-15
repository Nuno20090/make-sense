// TensorFlow-based pose detection removed. Provide a no-op stub to preserve API.
import {Pose} from '../interfaces/StubPose';
import {store} from '../index';
import {updatePoseDetectorStatus} from '../store/ai/actionCreators';
import {AIPoseDetectionActions} from '../logic/actions/AIPoseDetectionActions';
import {LabelType} from '../data/enums/LabelType';
import {LabelsSelector} from '../store/selectors/LabelsSelector';
import {updateActiveLabelType} from '../store/labels/actionCreators';
import {submitNewNotification} from '../store/notifications/actionCreators';
import {NotificationUtil} from '../utils/NotificationUtil';
import {NotificationsDataMap} from '../data/info/NotificationsData';
import {Notification} from '../data/enums/Notification';

export class PoseDetector {
    // No-op: model loading/inference removed. Methods kept to preserve external API.
    public static loadModel(callback?: () => unknown) {
        // mark model as unavailable and notify store accordingly
        store.dispatch(updatePoseDetectorStatus(false));
        if (callback) callback();
    }

    public static predict(_image: HTMLImageElement, callback?: (predictions: Pose[]) => unknown) {
        // No predictions available without TensorFlow; return empty array
        if (callback) callback([]);
    }
}
