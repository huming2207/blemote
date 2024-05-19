export const CAMERA_SERVICE_UUID = '8000ff00-ff00-ffff-ffff-ffffffffffff';

// This need to be hex only, see: https://github.com/innoveit/react-native-ble-manager/blob/f3704010e40edc6d0e8ce6ec4b4fbcb4c2c1b5d0/android/src/main/java/it/innove/UUIDHelper.java#L10
export const CAMERA_WRITE_CHARACTERISTIC = 'FF01'; // Command to send to camera
export const CAMERA_NOTIFY_CHARACTERISTIC = 'FF02'; // Camera status for notification

export const CAM_BUTTON_CMD_SHUTTER_HALF_UP = [0x01, 0x06];
export const CAM_BUTTON_CMD_SHUTTER_HALF_DOWN = [0x01, 0x07];
export const CAM_BUTTON_CMD_SHUTTER_FULL_UP = [0x01, 0x08];
export const CAM_BUTTON_CMD_SHUTTER_FULL_DOWN = [0x01, 0x09];
export const CAM_BUTTON_CMD_RECORD_UP = [0x01, 0x0e];
export const CAM_BUTTON_CMD_RECORD_DOWN = [0x01, 0x0f];
export const CAM_BUTTON_CMD_AF_ON_UP = [0x01, 0x14];
export const CAM_BUTTON_CMD_AF_ON_DOWN = [0x01, 0x15];
export const CAM_BUTTON_CMD_C1_UP = [0x01, 0x20];
export const CAM_BUTTON_CMD_C1_DOWN = [0x01, 0x21];
