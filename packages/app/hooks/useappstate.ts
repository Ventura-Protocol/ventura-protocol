import { useContext } from 'react';
import { AppStateContext } from '../components/app-state-provider';
export const useAppState = () => {
    const ctx = useContext(AppStateContext);
  
    if (!ctx) {
      throw Error(
        'The `useAppState` hook must be called from a descendent of the `AppStateProvider`.'
      );
    }
  
    return ctx
  }