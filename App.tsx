import React from 'react';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import {RemoteScreen} from './src/views/RemoteScreen';
import {SettingScreen} from './src/views/SettingScreen';
import BleManager from 'react-native-ble-manager';
import {Icon, PaperProvider} from 'react-native-paper';
import {LightNavTheme} from './src/styles/navTheme';
import {LightPaperTheme} from './src/styles/paperTheme';

const Tab = createBottomTabNavigator();

BleManager.start({showAlert: false}).then(() => {
  // Success code
  console.log('BLE manager initialized');
});

function App(): React.JSX.Element {
  return (
    <NavigationContainer theme={LightNavTheme}>
      <PaperProvider theme={LightPaperTheme}>
        <Tab.Navigator
          screenOptions={({route}) => ({
            // eslint-disable-next-line react/no-unstable-nested-components
            tabBarIcon: ({color, size}) => {
              let iconName: string = '';

              if (route.name === 'Remote') {
                iconName = 'remote';
              } else if (route.name === 'Settings') {
                iconName = 'cog-transfer';
              }

              return <Icon source={iconName} size={size} color={color} />;
            },
          })}>
          <Tab.Screen name="Remote" component={RemoteScreen} />
          <Tab.Screen name="Settings" component={SettingScreen} />
        </Tab.Navigator>
      </PaperProvider>
    </NavigationContainer>
  );
}

export default App;
