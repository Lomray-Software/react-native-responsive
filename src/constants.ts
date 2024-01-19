import { Dimensions, Platform, StatusBar } from 'react-native';

/**
 * Check if platform is Android
 */
export const isAndroid: boolean = Platform.OS === 'android';

/**
 * Check if platform is ios
 */
export const isIOS: boolean = Platform.OS === 'ios';

/**
 * Device screen's width
 */
export const SCREEN_WIDTH: number = Dimensions.get('window').width;

/**
 * Device screen's height
 */
export const SCREEN_HEIGHT: number =
  isAndroid && StatusBar.currentHeight
    ? Dimensions.get('window').height - StatusBar.currentHeight
    : Dimensions.get('window').height;

/**
 * Minimize layout ratio for the tablets
 */
const getDimensionsRatio = (): number => {
  let dimensionsRatio = 1;

  if (SCREEN_WIDTH > 1000) {
    dimensionsRatio = 0.55;
  } else if (SCREEN_WIDTH > 700) {
    dimensionsRatio = 0.7;
  }

  return dimensionsRatio;
};

export const DIMENSIONS_RATIO: number = getDimensionsRatio();
