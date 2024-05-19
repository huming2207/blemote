import {observable, action, makeObservable} from 'mobx';
import {Peripheral} from 'react-native-ble-manager';

export class BleState {
  scanning: boolean = false;
  scanResult: Peripheral[] = [];
  connectedDevice: Peripheral | undefined = undefined;

  constructor() {
    makeObservable(this, {
      scanning: observable,
      scanResult: observable,
      connectedDevice: observable,
      setScanning: action.bound,
      clearScanning: action.bound,
      addScannedDevice: action.bound,
      setScannedDevices: action.bound,
      setConnectedDevice: action.bound
    });
  }

  setScanning() {
    this.scanning = true;
  }

  clearScanning() {
    this.scanning = false;
  }

  addScannedDevice(device: Peripheral) {
    if (this.scanResult.some(item => item.id === device.id)) {
      return;
    }

    this.scanResult = [...this.scanResult, device];
  }

  setScannedDevices(devices: Peripheral[]) {
    this.scanResult = devices;
  }

  setConnectedDevice(device?: Peripheral) {
    this.connectedDevice = device;
  }
}

export const BleStateInstance = new BleState();
