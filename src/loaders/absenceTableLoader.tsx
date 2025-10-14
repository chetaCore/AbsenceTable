import * as React from 'react'
import { createRoot } from 'react-dom/client';
import { ControlCleanupCallback, ILoaderArgs, IRemoteComponentCoverApi } from '@directum/sungero-remote-component-types';
import AbsenceTable from '../controls/absenceTable/AbsenceTable';

export default (args: ILoaderArgs): Promise<ControlCleanupCallback> => {
  const root = createRoot(args.container);
  root.render(<AbsenceTable api={args.controlInfo as IRemoteComponentCoverApi}/>);
  return Promise.resolve(() => root.unmount());
};
