import React, {
  ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

import { BottomSheetModal } from '@gorhom/bottom-sheet';

import AppBottomSheet from './AppBottomSheet';
import {
  BottomSheetConfig,
  BottomSheetContext,
} from './bottomSheetContext';

type Props = {
  children: ReactNode;
};

const BottomSheetProvider = ({ children }: Props) => {
  const bottomSheetRef = useRef<BottomSheetModal>(null);

  const [config, setConfig] = useState<BottomSheetConfig | null>(null);

  const open = useCallback((config: BottomSheetConfig) => {
    setConfig(config);
  }, []);

  const close = useCallback(() => {
    bottomSheetRef.current?.dismiss();
  }, []);

  useEffect(() => {
    if (config) {
      requestAnimationFrame(() => {
        bottomSheetRef.current?.present();
      });
    }
  }, [config]);

  const handleDismiss = useCallback(() => {
    config?.onClose?.();
    setConfig(null);
  }, [config]);

  return (
    <BottomSheetContext.Provider
      value={{
        open,
        close,
      }}
    >
      {children}

      <AppBottomSheet
        ref={bottomSheetRef}
        config={config}
        onDismiss={handleDismiss}
      />
    </BottomSheetContext.Provider>
  );
};

export default BottomSheetProvider;