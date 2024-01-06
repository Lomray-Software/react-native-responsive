import { useWindowDimensions } from 'react-native';
import type { TOrientation } from './types';

/**
 * Device orientation hook
 */
const useOrientation = (): TOrientation => {
  const { width, height } = useWindowDimensions();

  if (width >= height) {
    return 'landscape';
  }

  return 'portrait';
};

export default useOrientation;
