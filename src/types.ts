import type { StyleSheet } from 'react-native';

export type TParams<TProps extends object = Record<any, any>> = TProps & {
  orientation: TOrientation;
};

export type TOrientation = 'portrait' | 'landscape';

export type TNamedStyles<T> = StyleSheet.NamedStyles<T>;
