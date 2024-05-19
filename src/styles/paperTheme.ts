import {MD3LightTheme as DefaultTheme} from 'react-native-paper';
import {blue, deepOrange} from 'material-colors-ts';

export const LightPaperTheme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: blue[700],
    accent: deepOrange.A700,
  },
};
