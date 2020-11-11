import React, { createContext, useContext } from 'react';
import loadable from '@loadable/component';

const MonacoLoader = loadable.lib(() => import('monaco-editor'));

const MonacoContext = createContext();

MonacoContext.displayName = 'MonacoContext';

export const MonacoProvider = props => (
  <MonacoLoader>{monaco => <MonacoContext.Provider value={monaco} {...props} />}</MonacoLoader>
);

export const useMonaco = () => useContext(MonacoContext);
