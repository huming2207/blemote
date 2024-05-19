import React, {useEffect} from 'react';
import {FlatList, ListRenderItemInfo, RefreshControl, StyleSheet, View} from 'react-native';
import {CameraCommInstance} from '../misc/cameraComm';
import {BleState} from '../states/BleState';
import {Peripheral} from 'react-native-ble-manager';
import {Observer} from 'mobx-react';
import {Divider, List, RadioButton} from 'react-native-paper';

export interface BleScanDialogProps {
  bleState: BleState;
}

export const BleScanDialog = (props: BleScanDialogProps) => {
  const camComm = CameraCommInstance;
  const bleState = props.bleState;
  const styles = StyleSheet.create({
    container: {
      flexGrow: 1,
    },
    radioButton: {
      marginTop: 10,
    },
  });

  useEffect(() => {
    console.log('Starting scan');
    bleState.setScannedDevices([]);
    startDeviceScan();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const startDeviceScan = () => {
    camComm.scan(5);
  };

  const camItemSelectionIndicator = (item: ListRenderItemInfo<Peripheral>): React.ReactElement => {
    return (
      <Observer>
        {() => (
          <View style={styles.radioButton}>
            <RadioButton
              value=""
              status={
                bleState.connectedDevice && bleState.connectedDevice.id === item.item.id ? 'checked' : 'unchecked'
              }
            />
          </View>
        )}
      </Observer>
    );
  };

  const renderCamItem = (item: ListRenderItemInfo<Peripheral>): React.ReactElement => {
    return (
      <Observer>
        {() => (
          <>
            <List.Item
              title={item.item.name || 'Unnamed camera'}
              description={item.item.id}
              onPress={() => camComm.connect(item.item)}
              right={() => camItemSelectionIndicator(item)}
            />
            <Divider />
          </>
        )}
      </Observer>
    );
  };

  return (
    <Observer>
      {() => (
        <FlatList
          contentContainerStyle={styles.container}
          data={bleState.scanResult.slice()}
          refreshControl={<RefreshControl enabled={true} refreshing={bleState.scanning} onRefresh={startDeviceScan} />}
          renderItem={renderCamItem}
          keyExtractor={(item: Peripheral) => item.id}
        />
      )}
    </Observer>
  );
};
