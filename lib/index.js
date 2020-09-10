"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isIOS = exports.isAndroid = exports.orIsL = exports.orIsP = exports.rol = exports.lor = exports.fs = exports.hp = exports.wp = void 0;
var react_native_1 = require("react-native");
/* Platform constants */
var isAndroid = react_native_1.Platform.OS === 'android';
exports.isAndroid = isAndroid;
var isIOS = react_native_1.Platform.OS === 'ios';
exports.isIOS = isIOS;
/* Retrieve initial screen's width */
var screenWidth = react_native_1.Dimensions.get('window').width;
/* Retrieve initial screen's height */
var screenHeight = isAndroid && react_native_1.StatusBar.currentHeight
    ? react_native_1.Dimensions.get('window').height - react_native_1.StatusBar.currentHeight
    : react_native_1.Dimensions.get('window').height;
var orientationIsPortrait = screenWidth < screenHeight;
exports.orIsP = orientationIsPortrait;
var orientationIsLandscape = screenWidth > screenHeight;
exports.orIsL = orientationIsLandscape;
/* Minimize layout ratio for tablets */
var dimensionsRatio = 1;
if (screenWidth > 1000) {
    dimensionsRatio = 0.55;
}
else if (screenWidth > 700) {
    dimensionsRatio = 0.7;
}
/**
 * Converts provided width percentage to independent pixel (dp).
 */
var widthPercentageToDP = function (widthPercent, disableRatio) {
    if (disableRatio === void 0) { disableRatio = false; }
    // Parse string percentage input and convert it to number.
    var elemWidth = parseFloat(widthPercent.toString());
    var size = (screenWidth * elemWidth) / 100;
    var result = react_native_1.PixelRatio.roundToNearestPixel(size);
    if (disableRatio) {
        // Use PixelRatio.roundToNearestPixel method in order to round the layout
        // size (dp) to the nearest one that correspons to an integer number of pixels.
        return result;
    }
    return result * dimensionsRatio;
};
exports.wp = widthPercentageToDP;
/**
 * Converts provided height percentage to independent pixel (dp).
 */
var heightPercentageToDP = function (heightPercent) {
    var elemHeight = parseFloat(heightPercent.toString());
    var size = (screenHeight * elemHeight) / 100;
    return react_native_1.PixelRatio.roundToNearestPixel(size) * dimensionsRatio;
};
exports.hp = heightPercentageToDP;
/**
 * Converts provided font size percentage to independent pixel (dp).
 */
var fontSizePercentageToDP = function (fontPercent) {
    var elemWidth = parseFloat(fontPercent.toString());
    var sizeWH = screenWidth < screenHeight ? screenWidth : screenHeight;
    var size = (sizeWH * elemWidth) / 100;
    return react_native_1.PixelRatio.roundToNearestPixel(size) * dimensionsRatio;
};
exports.fs = fontSizePercentageToDP;
/**
 * Event listener function that detects orientation change (every time it occurs) and triggers
 * screen rerendering. It does that, by changing the state of the screen where the function is
 * called. State changing occurs for a new state variable with the name 'orientation' that will
 * always hold the current value of the orientation after the 1st orientation change.
 * Invoke it inside the screen's constructor or in componentDidMount lifecycle method.
 */
var listenOrientationChange = function (that, callback) {
    react_native_1.Dimensions.addEventListener('change', function (newDimensions) {
        // Retrieve and save new dimensions
        screenWidth = newDimensions.window.width;
        screenHeight = newDimensions.window.height;
        exports.orIsP = orientationIsPortrait = screenWidth < screenHeight;
        exports.orIsL = orientationIsLandscape = screenWidth > screenHeight;
        // Trigger screen's rerender with a state update of the orientation variable
        that.setState({
            orientation: screenWidth < screenHeight ? 'portrait' : 'landscape',
        });
        if (typeof callback === 'function') {
            callback(that);
        }
    });
};
exports.lor = listenOrientationChange;
/**
 * Wrapper function that removes orientation change listener and should be invoked in
 * componentWillUnmount lifecycle method of every class component (UI screen) that
 * listenOrientationChange function has been invoked. This should be done in order to
 * avoid adding new listeners every time the same component is re-mounted.
 */
var removeOrientationListener = function () {
    react_native_1.Dimensions.removeEventListener('change', function () { return null; });
};
exports.rol = removeOrientationListener;
