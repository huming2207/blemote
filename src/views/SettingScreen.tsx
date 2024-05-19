import React, { useEffect } from 'react';
import {StyleSheet, View, ScrollView, Text, TouchableOpacity} from 'react-native';
import { BleScanDialog } from '../components/bleScanDialog';
import { BleStateInstance } from '../states/BleState';
import { CameraCommInstance } from '../misc/cameraComm';

export function SettingScreen() {
  useEffect(() => {
    (async () => {
      const allowed = await CameraCommInstance.checkPermission();
      if (!allowed) {
        await CameraCommInstance.requestPermission();
      }
    })();
  }, []);

  return (
    <>
      <BleScanDialog bleState={BleStateInstance} />
    </>
  );
};
