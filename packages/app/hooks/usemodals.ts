import { useContext } from 'react';
import { ContextType, ModalContext } from '../components/modal-provider';
export const useModals = () => {
    const ctx: ContextType = useContext(ModalContext);
  
    if (!ctx) {
      throw Error(
        'The `useModals` hook must be called from a descendent of the `ModalProvider`.'
      );
    }
  
    return ctx
  }