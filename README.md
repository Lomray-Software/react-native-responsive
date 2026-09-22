# React Native Responsive

Convert dimensions from a reference design into React Native layout sizes, and select styles by orientation. This is not a CSS breakpoint system or a live window-resizing engine.

## Version and limits

The examples target `@lomray/react-native-responsive@2.2.0`. Its declared peers are React `>=16.8.0` and React Native `>=0.62.0`; those ranges are not a tested compatibility matrix.

`wp`, `hp` and `fs` use window dimensions captured when the module loads. They normalize width to the shorter side and height to the longer side. `useOrientation` reacts to window changes, but does not update those captured scaling dimensions. Do not use these helpers when each resize must recalculate pixel sizes.

The default tablet ratio reduces sizes to 0.7 when the initial width exceeds 700, or 0.55 above 1000. Pass `true` as the second argument to bypass that ratio. `fs` scales by width, not by a separate font-scale policy; check accessibility in your app.

## Minimal component

<!-- docs-example: responsive -->
```tsx
import React from 'react';
import { Text, View } from 'react-native';
import { ResponsiveManager } from '@lomray/react-native-responsive';

const { wp, hp, fs } = new ResponsiveManager({ width: 390, height: 844 });

export default function Card() {
  return (
    <View style={{ padding: wp(24), minHeight: hp(100) }}>
      <Text style={{ fontSize: fs(18) }}>Account</Text>
    </View>
  );
}
```

There is no subscription to dispose in this static example. For orientation-specific styles, use `useStyles` below inside a React component. The `@services/responsive-manager` imports in the multi-file examples are application aliases, not package exports.

![npm](https://img.shields.io/npm/v/@lomray/react-native-responsive)
![GitHub](https://img.shields.io/github/license/Lomray-Software/react-native-responsive)

[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=react-native-responsive&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=react-native-responsive)
[![Reliability Rating](https://sonarcloud.io/api/project_badges/measure?project=react-native-responsive&metric=reliability_rating)](https://sonarcloud.io/summary/new_code?id=react-native-responsive)
[![Security Rating](https://sonarcloud.io/api/project_badges/measure?project=react-native-responsive&metric=security_rating)](https://sonarcloud.io/summary/new_code?id=react-native-responsive)
[![Vulnerabilities](https://sonarcloud.io/api/project_badges/measure?project=react-native-responsive&metric=vulnerabilities)](https://sonarcloud.io/summary/new_code?id=react-native-responsive)
[![Lines of Code](https://sonarcloud.io/api/project_badges/measure?project=react-native-responsive&metric=ncloc)](https://sonarcloud.io/summary/new_code?id=react-native-responsive)
[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=react-native-responsive&metric=coverage)](https://sonarcloud.io/summary/new_code?id=react-native-responsive)

## Why is this library useful?
For the layout to look the same proportions on any device, we can’t just use pixel values for padding and sizes.

These helpers scale reference-design values to the initial window dimensions. Layout proportions still need to be checked on the devices and accessibility settings your app supports.

There is also a built-in ability to set styles for different orientations conveniently.

## How it works?
We most often know the dimensions of the device on which the design was made (for example, in Figma).

Therefore, relative to the maximum height and width of the device, we can calculate what percentage of the width or height should be occupied by a specific layout element.

## Installation

npm or yarn
```sh
npm install --save @lomray/react-native-responsive

yarn add @lomray/react-native-responsive
```

## How to use
Initialize ResponsiveManager with your device parameters by design to get helper functions.
```typescript
/**
 * src/services/responsive-manager.ts
 */
import { ResponsiveManager } from '@lomray/react-native-responsive';

const { fs, hp, wp } = new ResponsiveManager({ height: 844, width: 390 });

export { fs, hp, wp };

```

| Helper | Description                                                            |
|:-------|:-----------------------------------------------------------------------|
| wp     | Calculates width value from px to independent pixel (screen percent).  |
| hp     | Calculates height value from px to independent pixel (screen percent). |
| fs     | Works as 'wp', but for the fonts size.                                 |


Each function has the same parameters:
`(value: number, disableRatio = false) => number`.

By default, DIMENSIONS_RATIO is used to reduce the layout for devices with larger screens.

This ratio is a fixed heuristic, not a replacement for app-specific breakpoints. Disable it for a particular value by passing `true` as the second argument.

More details can be found in `src/constants:getDimensionsRatio.`

### [Demo project](https://github.com/Lomray-Software/react-native-responsive-example)

### 1. Base example (without orientation changing).

#### 1.1. Create styles.

```typescript
import { StyleSheet } from 'react-native';
import { fs, hp, wp } from '@services/responsive-manager';

const styles = StyleSheet.create({
  section: {
    paddingHorizontal: wp(24),
    height: hp(200),
    margin: hp(5),
    width: wp(380),
  },
  title: {
    fontSize: fs(24),
    fontWeight: '600',
  },
});

export default styles;
```

#### 1.2. Use created styles in the component.

```typescript jsx
import React, { FC } from 'react';
import { Text, View } from 'react-native';
import styles from './styles';

interface ISection {
  title: string;
}

const Section: FC<ISection> = ({ title }) => (
  <View style={styles.section}>
    <Text style={styles.title}>{title}</Text>
  </View>
);

export default Section;

```

### 2. Advanced example (with orientation changing).

#### 2.1. Use styles as a function to access additional parameters.

```typescript
import { TParams } from '@lomray/react-native-responsive';
import { StyleSheet } from 'react-native';
import { fs, hp, wp } from '@services/responsive-manager';

const styles = ({ orientation }: TParams) => StyleSheet.create({
  section: {
    paddingHorizontal: wp(24),
    height: hp(200),
    margin: hp(5),
    justifyContent: 'center',
    borderWidth: 1,
    ...(orientation === 'portrait'
      ? {
        backgroundColor: 'white',
        borderColor: 'black',
      }
      : {
        backgroundColor: 'black',
        borderColor: 'white',
        width: wp(220),
      }),
  },
  title: {
    fontSize: fs(24),
    fontWeight: '600',
    color: orientation === 'portrait' ? 'black' : 'white',
  },
  description: {
    marginTop: hp(8),
    fontSize: fs(18),
    fontWeight: '400',
    color: orientation === 'portrait' ? 'black' : 'white',
  },
});

export default styles;

```

#### 2.2. Use created styles in the component using the useStyles hook.

```typescript jsx
import { useStyles } from '@lomray/react-native-responsive';
import React, { FC } from 'react';
import { Text, View } from 'react-native';
import stylesheet from './styles';

interface ISection {
  title: string;
}

const Section: FC<ISection> = ({ title }) => {
  const styles = useStyles(stylesheet);

  return (
    <View style={styles.section}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

export default Section;

```

### 3. Additional features.

#### 3.1. Parameters from the component can be passed to the stylesheet.
The parameters will always contain "orientation" and also custom props  that you pass by the second argument of the useStyles hook.

```typescript jsx
/**
 * index.tsx
 */
import { useStyles } from '@lomray/react-native-responsive';
import React from 'react';
import { View } from 'react-native';
import stylesheet from './styles';

const Component = () => {
  const styles = useStyles(stylesheet, { isWhite: true });

  return <View style={styles.wrapper} />;
};


export default Component;

```

```typescript jsx
/*
 * styles.ts
 */
import { TParams } from '@lomray/react-native-responsive';
import { StyleSheet } from 'react-native';

interface ICustomParams {
  isWhite: boolean;
}

const styles = ({ isWhite }: TParams<ICustomParams>) => StyleSheet.create({
  wrapper: {
    backgroundColor: isWhite ? 'white' : 'black',
  },
});

export default styles;

```
