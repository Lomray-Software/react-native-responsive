import type { Component } from 'react';
import { Dimensions, PixelRatio, Platform, StatusBar } from 'react-native';

/* Platform constants */
const isAndroid: boolean = Platform.OS === 'android';
const isIOS: boolean = Platform.OS === 'ios';

/* Retrieve initial screen's width */
let screenWidth: number = Dimensions.get('window').width;

/* Retrieve initial screen's height */
let screenHeight =
  isAndroid && StatusBar.currentHeight
    ? Dimensions.get('window').height - StatusBar.currentHeight
    : Dimensions.get('window').height;

let isOrientationIsPortrait: boolean = screenWidth < screenHeight;
let isOrientationIsLandscape: boolean = screenWidth > screenHeight;

/* Minimize layout ratio for tablets */
let dimensionsRatio = 1;

if (screenWidth > 1000) {
  dimensionsRatio = 0.55;
} else if (screenWidth > 700) {
  dimensionsRatio = 0.7;
}

/**
 * Converts provided width percentage to independent pixel (dp).
 */
const widthPercentageToDP = (
  widthPercent: number,
  disableRatio = false
): number => {
  // Parse string percentage input and convert it to number.
  const elemWidth: number = Number.parseFloat(widthPercent.toString());
  const size: number = (screenWidth * elemWidth) / 100;
  const result: number = PixelRatio.roundToNearestPixel(size);

  if (disableRatio) {
    // Use PixelRatio.roundToNearestPixel method in order to round the layout
    // size (dp) to the nearest one that corresponds to an integer number of pixels.
    return result;
  }

  return result * dimensionsRatio;
};

/**
 * Converts provided height percentage to independent pixel (dp).
 */
const heightPercentageToDP = (heightPercent: number): number => {
  const elemHeight: number = Number.parseFloat(heightPercent.toString());
  const size: number = (screenHeight * elemHeight) / 100;

  return PixelRatio.roundToNearestPixel(size) * dimensionsRatio;
};

/**
 * Converts provided font size percentage to independent pixel (dp).
 */
const fontSizePercentageToDP = (fontPercent: number): number => {
  const elemWidth: number = Number.parseFloat(fontPercent.toString());
  const sizeWH: number =
    screenWidth < screenHeight ? screenWidth : screenHeight;
  const size: number = (sizeWH * elemWidth) / 100;

  return PixelRatio.roundToNearestPixel(size) * dimensionsRatio;
};

/**
 * Event listener function that detects orientation change (every time it occurs) and triggers
 * screen re-rendering. It does that, by changing the state of the screen where the function is
 * called. State changing occurs for a new state variable with the name 'orientation' that will
 * always hold the current value of the orientation after the 1st orientation change.
 * Invoke it inside the screen's constructor or in componentDidMount lifecycle method.
 */
const listenOrientationChange = (
  that: Component,
  callback: (val: Component) => void
): void => {
  Dimensions.addEventListener('change', (newDimensions) => {
    // Retrieve and save new dimensions
    screenWidth = newDimensions.window.width;
    screenHeight = newDimensions.window.height;
    isOrientationIsPortrait = screenWidth < screenHeight;
    isOrientationIsLandscape = screenWidth > screenHeight;

    // Trigger screen's rerender with a state update of the orientation variable
    that.setState({
      orientation: screenWidth < screenHeight ? 'portrait' : 'landscape',
    });

    if (typeof callback === 'function') {
      callback(that);
    }
  });
};

/**
 * Wrapper function that removes orientation change listener and should be invoked in
 * componentWillUnmount lifecycle method of every class component (UI screen) that
 * listenOrientationChange function has been invoked. This should be done in order to
 * avoid adding new listeners every time the same component is re-mounted.
 */
const removeOrientationListener = (): void => {
  Dimensions.removeEventListener('change', () => null);
};

/**
 * Creating paddings for all sides
 */
const makePadding = (
  top: number,
  right?: number,
  bottom?: number,
  left?: number
) => ({
  paddingTop: top,
  paddingRight: right ? right : top,
  paddingBottom: bottom ? bottom : top,
  paddingLeft: left ? left : right || top,
});

export {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  fontSizePercentageToDP as fs,
  listenOrientationChange as lor,
  removeOrientationListener as rol,
  isOrientationIsPortrait as orIsP,
  isOrientationIsLandscape as orIsL,
  isAndroid,
  isIOS,
  makePadding,
};
