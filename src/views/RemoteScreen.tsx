import React from 'react';
import {StyleSheet} from 'react-native';
import {FAB} from 'react-native-paper';
import {CameraCommInstance} from '../misc/cameraComm';
import HapticFeedback from 'react-native-haptic-feedback';
import {BleStateInstance} from '../states/BleState';
import {Observer} from 'mobx-react';

export function RemoteScreen(): React.JSX.Element {
  const styles = StyleSheet.create({
    fab: {
      position: 'relative',
      margin: 16,
      right: 0,
      bottom: 0,
    },
  });

  const triggerHapticMedium = () => {
    HapticFeedback.trigger('soft', {enableVibrateFallback: true});
  };

  const triggerHapticHeavy = () => {
    HapticFeedback.trigger('rigid', {enableVibrateFallback: true});
  };

  return (
    <Observer>
      {() => (
        <>
          <FAB
            icon="focus-auto"
            label="Focus"
            disabled={!BleStateInstance.connectedDevice}
            style={styles.fab}
            onTouchStart={async () => {
              triggerHapticHeavy();
              await CameraCommInstance.setShutterHalfDown();
            }}
            onTouchEnd={async () => {
              triggerHapticMedium();
              await CameraCommInstance.setShutterHalfUp();
            }}
          />
          <FAB
            icon="camera-burst"
            label="Shutter"
            disabled={!BleStateInstance.connectedDevice}
            style={styles.fab}
            onTouchStart={async () => {
              triggerHapticHeavy();
              await CameraCommInstance.setShutterFullDown();
            }}
            onTouchEnd={async () => {
              triggerHapticMedium();
              await CameraCommInstance.setShutterFullUp();
            }}
          />
          <FAB
            icon="camera-control"
            label="C1"
            style={styles.fab}
            disabled={!BleStateInstance.connectedDevice}
            onTouchStart={async () => {
              triggerHapticHeavy();
              await CameraCommInstance.setCustomDown();
            }}
            onTouchEnd={async () => {
              triggerHapticMedium();
              await CameraCommInstance.setCustomUp();
            }}
          />
        </>
      )}
    </Observer>
  );
}
