

import {AppRegistry} from 'react-native';
import Navigation from './src/pages/navigation';
import {name as appName} from './app.json';
import 'react-native-gesture-handler';
AppRegistry.registerComponent(appName, () => Navigation);
