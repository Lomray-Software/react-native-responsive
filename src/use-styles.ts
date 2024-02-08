import { useMemo } from 'react';
import createStyles from './create-styles';
import type { TNamedStyles } from './types';
import useOrientation from './use-orientation';

/**
 * Custom styles with orientation
 */
const useStyles = <
  T extends TNamedStyles<T> | TNamedStyles<any>,
  TParams extends object = Record<any, any>,
>(
  stylesheet: T | TNamedStyles<T> | ((params: TParams) => T | TNamedStyles<T>),
  params?: TParams,
): T | TNamedStyles<T> => {
  const orientation = useOrientation();

  /**
   * Normalize stylesheet
   */
  const styles = useMemo(() => {
    if (typeof stylesheet === 'function') {
      return stylesheet(params ?? ({} as TParams));
    }

    return stylesheet;
  }, [stylesheet, params]);

  return useMemo(() => createStyles(styles, orientation), [styles, orientation]);
};

export default useStyles;
