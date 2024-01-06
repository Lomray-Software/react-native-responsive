import { useWindowDimensions } from 'react-native';
import type { TDeviceOrientation } from './types';

/**
 * Device orientation hook
 */
const useDeviceOrientation = (): TDeviceOrientation => {
  const { width, height } = useWindowDimensions();

  if (width >= height) {
    return 'landscape';
  }

  return 'portrait';
};

export default useDeviceOrientation;
