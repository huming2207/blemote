import {PermissionsAndroid, Platform} from 'react-native';
import BleManager, {
  BleDiscoverPeripheralEvent,
  BleManagerDidUpdateValueForCharacteristicEvent,
  Peripheral,
} from 'react-native-ble-manager';
import {CAMERA_NOTIFY_CHARACTERISTIC, CAMERA_SERVICE_UUID} from './constants';
import {BleStateInstance} from '../states/BleState';

export class BaseBleComm {
  public async requestPermission(): Promise<void> {
    if (Platform.OS !== 'android') {
      return;
    }

    try {
      const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION, {
        title: 'Need location permission for BLE',
        message: 'You know that',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      });
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the BLE now');
      } else {
        console.log('BLE permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  }

  public async checkPermission(): Promise<boolean> {
    if (Platform.OS !== 'android') {
      return true;
    }

    return PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
  }

  public async scan(timeout: number): Promise<void> {
    BleStateInstance.setScanning();
    BleStateInstance.setScannedDevices([]);
    await BleManager.scan([CAMERA_SERVICE_UUID], timeout, false);

    setTimeout(() => {
      BleStateInstance.clearScanning();
    }, timeout * 1000);

    BleManager.addListener('BleManagerDiscoverPeripheral', (event: BleDiscoverPeripheralEvent) => {
      BleStateInstance.addScannedDevice(event);
    });
  }

  public async connect(device: Peripheral): Promise<void> {
    try {
      await BleManager.connect(device.id);
      await BleManager.retrieveServices(device.id, [CAMERA_SERVICE_UUID]);
      await BleManager.startNotification(device.id, CAMERA_SERVICE_UUID, CAMERA_NOTIFY_CHARACTERISTIC);
    } catch (err) {
      throw err;
    }

    BleStateInstance.setConnectedDevice(device);
    BleManager.addListener(
      'BleManagerDidUpdateValueForCharacteristic',
      (event: BleManagerDidUpdateValueForCharacteristicEvent) => {},
    );
  }

  public async isConnected(device: Peripheral): Promise<boolean> {
    return await BleManager.isPeripheralConnected(device.id);
  }

  public async disconnect(device: Peripheral): Promise<void> {
    BleManager.disconnect(device.id).then(() => {
      BleStateInstance.setConnectedDevice(undefined);
    });
  }

  public async writeCharacteristic(characteristicUuid: string, data: number[]): Promise<void> {
    if (!BleStateInstance.connectedDevice) {
      return;
    }

    await BleManager.write(BleStateInstance.connectedDevice.id, CAMERA_SERVICE_UUID, characteristicUuid, data, 3);
  }
}
