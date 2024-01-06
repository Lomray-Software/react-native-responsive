import { StyleSheet } from 'react-native';
import type { TDeviceOrientation, TNamedStyles } from './types';

/**
 * Creates a StyleSheet style reference from the given object.
 */
const createStyles = <T extends TNamedStyles<T> | TNamedStyles<any>>(
  styles: T & TNamedStyles<any>,
  orientation?: TDeviceOrientation,
): T => {
  if (!orientation) {
    return StyleSheet.create(styles);
  }

  const newStyles = {} as T & TNamedStyles<any>;

  for (const key in styles) {
    const allProps = styles[key];
    const orientationProps = allProps?.[`_${orientation}`] ?? {};

    // @ts-ignore
    newStyles[key] = { ...allProps, ...orientationProps };

    // remove RN warnings
    if (newStyles[key]?._portrait) {
      delete newStyles[key]._portrait;
    }

    if (newStyles[key]?._landscape) {
      delete newStyles[key]._landscape;
    }
  }

  return StyleSheet.create(newStyles);
};

export default createStyles;
