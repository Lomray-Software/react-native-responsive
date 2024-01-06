import { PixelRatio, StyleSheet } from 'react-native';
import { DIMENSIONS_RATIO, SCREEN_HEIGHT, SCREEN_WIDTH } from './constants';
import type { TNamedStyles, TOrientation } from './types';

interface IResponsiveManagerParams {
  width: number;
  height: number;
}

/**
 * ResponsiveManager
 */
class ResponsiveManager {
  /**
   * Device width and height by design
   */
  private readonly params: IResponsiveManagerParams;

  constructor(params: IResponsiveManagerParams) {
    this.params = params;
  }

  /**
   * Get window width
   */
  private getWindowWidth = (): number =>
    SCREEN_WIDTH < SCREEN_HEIGHT ? SCREEN_WIDTH : SCREEN_HEIGHT;

  /**
   * Get window height
   */
  private getWindowHeight = (): number =>
    SCREEN_WIDTH < SCREEN_HEIGHT ? SCREEN_HEIGHT : SCREEN_WIDTH;

  /**
   * Use PixelRatio.roundToNearestPixel method in order to round the layout
   * size (dp) to the nearest one that corresponds to an integer number of pixels.
   */
  private roundToNearestPixel = (value: number, disableRatio: boolean): number => {
    const result = PixelRatio.roundToNearestPixel(value);

    if (disableRatio) {
      return result;
    }

    return PixelRatio.roundToNearestPixel(result * DIMENSIONS_RATIO);
  };

  /**
   * Converts provided width to independent pixel (dp).
   */
  public wp = (value: number, disableRatio = false): number => {
    const widthPercent = (value / this.params.width) * 100;
    // Parse string percentage input and convert it to number.
    const elemWidth = Number.parseFloat(widthPercent.toString());
    const size = (this.getWindowWidth() * elemWidth) / 100;

    return this.roundToNearestPixel(size, disableRatio);
  };

  /**
   * Converts provided height to independent pixel (dp).
   */
  public hp = (value: number, disableRatio = false): number => {
    const heightPercent = (value / this.params.height) * 100;
    const elemHeight = Number.parseFloat(heightPercent.toString());
    const size = (this.getWindowHeight() * elemHeight) / 100;

    return this.roundToNearestPixel(size, disableRatio);
  };

  /**
   * Converts provided font size to independent pixel (dp).
   */
  public fs = (value: number, disableRatio = false): number => {
    const fontPercent = (value / this.params.width) * 100;
    const elemWidth = Number.parseFloat(fontPercent.toString());
    const size = (this.getWindowWidth() * elemWidth) / 100;

    return this.roundToNearestPixel(size, disableRatio);
  };

  /**
   * Creates a StyleSheet style reference from the given object
   */
  public static createStyles = <T extends TNamedStyles<T> | TNamedStyles<any>>(
    styles: T & TNamedStyles<any>,
    orientation?: TOrientation,
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
}

export default ResponsiveManager;
