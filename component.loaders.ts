import { IRemoteControlLoader } from '@directum/sungero-remote-component-types';
import * as absenceTableLoader from './src/loaders/absenceTableLoader'

const loaders: Record<string, IRemoteControlLoader> = {
  'absenceTableLoader': absenceTableLoader
};

export default loaders;
