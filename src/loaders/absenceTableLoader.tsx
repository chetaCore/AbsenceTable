import * as React from 'react'
import { createRoot } from 'react-dom/client';
import { ControlCleanupCallback, ILoaderArgs, IRemoteComponentCoverApi } from '@directum/sungero-remote-component-types';
import { AbsenceTable } from '../controls/absenceTable/AbsenceTable';
import { I18nextProvider } from 'react-i18next';
import i18n from '../../i18n';

export default async (args: ILoaderArgs): Promise<ControlCleanupCallback> => {
  if (!i18n.isInitialized) {
    await i18n.init();
  }

  const root = createRoot(args.container);
  root.render(
    <I18nextProvider i18n={i18n}>
      <AbsenceTable api={args.controlInfo as IRemoteComponentCoverApi } context ={ args.initialContext } />
    </I18nextProvider>
  );
  
  return Promise.resolve(() => root.unmount());
};