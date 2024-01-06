import { useMemo } from 'react';
import create from './create-styles';
import type { TNamedStyles } from './types';
import useDeviceOrientation from './use-device-orientation';

/**
 * Responsive orientation hook
 * Make sense to use only if app need in orientation switching
 */
const useResponsive = <T extends TNamedStyles<T> | TNamedStyles<any>>(
  styles: T | TNamedStyles<T>,
): T | TNamedStyles<T> => {
  const orientation = useDeviceOrientation();

  return useMemo(() => create(styles, orientation), [styles, orientation]);
};

export default useResponsive;
