import { useMemo } from 'react';
import type { TNamedStyles, TParams } from './types';
import useOrientation from './use-orientation';

/**
 * Styles with orientation and additional params
 */
const useStyles = <T extends TNamedStyles<T>, TProps extends object = Record<any, any>>(
  stylesheet: (props: TParams<TProps>) => T | TNamedStyles<T>,
  props?: TProps,
): T | TNamedStyles<T> => {
  const orientation = useOrientation();

  return useMemo(
    () => stylesheet({ ...((props ?? {}) as TProps), orientation }),
    [stylesheet, orientation, props],
  );
};

export default useStyles;
