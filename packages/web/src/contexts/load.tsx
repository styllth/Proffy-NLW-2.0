import React, { createContext, useState } from 'react';

import Loading from '../components/Loading';

interface LoadContextData {
  load: boolean;
  setLoad(props: boolean): void;
}

export const LoadContext = createContext<LoadContextData>(
  {} as LoadContextData
);

export const LoadProvider: React.FC = ({ children }) => {
  const [load, updateLoad] = useState(true);

  const setLoad = (props: boolean) => {
    if (!props) {
      setTimeout(() => {
        updateLoad(false);
      }, 3000);
    }
    updateLoad(props);
  };
  return (
    <LoadContext.Provider value={{ load, setLoad }}>
      <Loading actived={load} />
      {children}
    </LoadContext.Provider>
  );
};
