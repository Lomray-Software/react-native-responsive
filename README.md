# React Native Responsive

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

The best way is to convert pixels to screen percentages.

Only in this case will each element of the design look in the same proportions, regardless of how wide or elongated the device’s screen is.

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

Therefore, we don't need to do the layout based on breakpoints with these helpers.
But we still have the option to disable this for specific layout cases.

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

#### 2.1. Use createStyles function for the component styles.

```typescript
import { createStyles } from '@lomray/react-native-responsive';
import { fs, hp, wp } from '@services/responsive-manager';

const styles = createStyles({
  section: {
    paddingHorizontal: wp(24),
    height: hp(200),
    margin: hp(5),
    justifyContent: 'center',
    borderWidth: 1,
    _landscape: {
      backgroundColor: 'black',
      borderColor: 'white',
      width: wp(220),
    },
    _portrait: {
      backgroundColor: 'white',
      borderColor: 'black',
    },
  },
  title: {
    fontSize: fs(24),
    fontWeight: '600',
    _landscape: {
      color: 'white',
    },
    _portrait: {
      color: 'black',
    },
  },
  description: {
    marginTop: hp(8),
    fontSize: fs(18),
    fontWeight: '400',
    _landscape: {
      color: 'white',
    },
    _portrait: {
      color: 'black',
    },
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
import { StyleSheet } from 'react-native';
import { IParams } from './index';

interface IParams {
  isWhite: boolean;
}

const styles = (params: IParams) => StyleSheet.create({
  wrapper: {
    color: isWhite ? 'white' : 'black',
  },
});

export default styles;

```
