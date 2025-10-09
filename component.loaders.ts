import { IRemoteControlLoader } from '@directum/sungero-remote-component-types';

import * as ControlInfo from './src/loaders/control-loader'

// Загрузчики контролов компонента.
const loaders: Record<string, IRemoteControlLoader> = {
  'control-loader': ControlInfo
};

export default loaders;
