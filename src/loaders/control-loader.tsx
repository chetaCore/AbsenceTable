import * as React from 'react'
import { createRoot } from 'react-dom/client';
import { ControlCleanupCallback, ILoaderArgs, IRemoteComponentCoverApi } from '@directum/sungero-remote-component-types';

import ControlInfo from '../controls/control/control';

/**
 * Загрузчик контрола для контекста обложки модуля.
 * @param args Аргументы загрузчика.
 */
export default (args: ILoaderArgs): Promise<ControlCleanupCallback> => {
  const root = createRoot(args.container);
  root.render(<ControlInfo/>);
  return Promise.resolve(() => root.unmount());
};
