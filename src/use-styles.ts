import { useMemo } from 'react';
import createStyles from './create-styles';
import type { TNamedStyles } from './types';
import useOrientation from './use-orientation';

/**
 * Custom styles with orientation
 * Make sense to use only if app need in orientation switching
 */
const useStyles = <T extends TNamedStyles<T> | TNamedStyles<any>>(
  styles: T | TNamedStyles<T>,
): T | TNamedStyles<T> => {
  const orientation = useOrientation();

  return useMemo(() => createStyles(styles, orientation), [styles, orientation]);
};

export default useStyles;
