# React Native Layout Helper
Library based on https://github.com/marudy/react-native-responsive-screen

![npm](https://img.shields.io/npm/v/@lomray/react-native-layout-helper)
![GitHub](https://img.shields.io/github/license/Lomray-Software/react-native-layout-helper)

[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=react-native-layout-helper&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=react-native-layout-helper)
[![Reliability Rating](https://sonarcloud.io/api/project_badges/measure?project=react-native-layout-helper&metric=reliability_rating)](https://sonarcloud.io/summary/new_code?id=react-native-layout-helper)
[![Security Rating](https://sonarcloud.io/api/project_badges/measure?project=react-native-layout-helper&metric=security_rating)](https://sonarcloud.io/summary/new_code?id=react-native-layout-helper)
[![Vulnerabilities](https://sonarcloud.io/api/project_badges/measure?project=react-native-layout-helper&metric=vulnerabilities)](https://sonarcloud.io/summary/new_code?id=react-native-layout-helper)
[![Lines of Code](https://sonarcloud.io/api/project_badges/measure?project=react-native-layout-helper&metric=ncloc)](https://sonarcloud.io/summary/new_code?id=react-native-layout-helper)
[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=react-native-layout-helper&metric=coverage)](https://sonarcloud.io/summary/new_code?id=react-native-layout-helper)

## Calculator program
To simplify calculations, it is better to use the [program](https://github.com/danial031193/rn-size-calculator/releases)

## Installation

npm or yarn
```sh
npm install --save @lomray/react-native-layout-helper

yarn add @lomray/react-native-layout-helper
```

## Helper functions
| Function name| Types | Description |
|:----|:-----:|:----------|
| isIOS | `boolean` | Check if platform is IOS |
| isAndroid | `boolean` | Check if platform is Android |
| wp | `(widthPercent: number, disableRatio = false) => number` | Converts provided width percentage to independent pixel (dp). Disable ratio is intended for some cases when the width on tablets should be the full width of the screen |
| hp | `(heightPercent: number) => number` | Converts provided height percentage to independent pixel (dp). |
| fs | `(fontPercent: number) => number` | Converts provided font size percentage to independent pixel (dp). Calculates based on the current screen width (including orientation)|
| orIsP | `boolean` | Check if orientation is portrait |
| orIsL | `boolean` | Check if orientation is landscape |
| lor | `(that: Component, callback: (val: Component) => void` | Event listener function that detects orientation change |
| rol | `() => void` | Wrapper function that removes orientation change listener |

## Basic example

The calculations in this example are made for an iPhone X screen 812x375

```js
import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { fs, hp, wp } from '@lomray/react-native-layout-helper';

const styles = StyleSheet.create({
  viewBlock: {
    paddingVertical: hp(1.478), // 12
    marginBottom: hp(3.941), // 32
    width: wp(56.267), // 211
  },
  text: {
    fontSize: fs(4.8), // 18
    lineHeight: fs(5.333), // 20
  },
  disableRatioWidth: {
    width: wp(100, true), // 375
  },
});

class Example extends Component {
  render() {
    return (
      <View style={styles.disableRatioWidth}>
        <View style={styles.viewBlock}>
          <Text style={styles.text}>Example</Text>
        </View>
      </View>
    );
  }
};
```
## Change orientation example
```js
import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { fs, hp, wp, lor, rol, orIsP } from '@lomray/react-native-layout-helper';

const stylesF = () => StyleSheet.create({
  viewBlock: {
    paddingVertical: hp(1.478), // 12
    marginBottom: hp(3.941), // 32
    width: wp(56.267), // 211
    height: orIsP ? hp(3.5) : wp(5.5),
  },
  text: {
    fontSize: fs(4.8), // 18
    lineHeight: fs(5.333), // 20
  },
  disableRatioWidth: {
    width: wp(100, true), // 375
  },
});

let styles = stylesF();

class Example extends Component {
  componentDidMount() {
    lor(this, () => {
      styles = stylesF();
    });
  }

  componentWillUnmount() {
    rol();
  }

  render() {
    return (
      <View style={styles.disableRatioWidth}>
        <View style={styles.viewBlock}>
          <Text style={styles.text}>Example</Text>
        </View>
      </View>
    );
  }
};

```
