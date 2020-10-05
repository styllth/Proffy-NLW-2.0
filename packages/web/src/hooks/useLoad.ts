import { useContext } from 'react';
import { LoadContext } from '../contexts/load';

export function useLoad() {
  const context = useContext(LoadContext);

  return context;
}
