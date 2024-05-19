import {BaseBleComm} from './baseBLEComm';
import {
  CAMERA_WRITE_CHARACTERISTIC,
  CAM_BUTTON_CMD_C1_DOWN,
  CAM_BUTTON_CMD_C1_UP,
  CAM_BUTTON_CMD_RECORD_DOWN,
  CAM_BUTTON_CMD_RECORD_UP,
  CAM_BUTTON_CMD_SHUTTER_FULL_DOWN,
  CAM_BUTTON_CMD_SHUTTER_FULL_UP,
  CAM_BUTTON_CMD_SHUTTER_HALF_DOWN,
  CAM_BUTTON_CMD_SHUTTER_HALF_UP,
} from './constants';

export class CameraComm extends BaseBleComm {
  private async writeCameraCmd(cmd: number[]) {
    await this.writeCharacteristic(CAMERA_WRITE_CHARACTERISTIC, cmd);
  }

  public async setShutterHalfUp() {
    await this.writeCameraCmd(CAM_BUTTON_CMD_SHUTTER_HALF_UP);
  }

  public async setShutterHalfDown() {
    await this.writeCameraCmd(CAM_BUTTON_CMD_SHUTTER_HALF_DOWN);
  }

  public async setShutterFullUp() {
    await this.writeCameraCmd(CAM_BUTTON_CMD_SHUTTER_FULL_UP);
  }

  public async setShutterFullDown() {
    await this.writeCameraCmd(CAM_BUTTON_CMD_SHUTTER_FULL_DOWN);
  }

  public async setRecordUp() {
    await this.writeCameraCmd(CAM_BUTTON_CMD_RECORD_UP);
  }

  public async setRecordDown() {
    await this.writeCameraCmd(CAM_BUTTON_CMD_RECORD_DOWN);
  }

  public async setCustomUp() {
    await this.writeCameraCmd(CAM_BUTTON_CMD_C1_UP);
  }

  public async setCustomDown() {
    await this.writeCameraCmd(CAM_BUTTON_CMD_C1_DOWN);
  }
}

export const CameraCommInstance = new CameraComm();
