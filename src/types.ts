import type {
  ImageStyle as ImageStyleBase,
  TextStyle as TextStyleBase,
  ViewStyle as ViewStyleBase,
} from 'react-native';

interface IViewStyle extends ViewStyleBase {
  _portrait?: ViewStyleBase;
  _landscape?: ViewStyleBase;
}

interface ITextStyle extends TextStyleBase {
  _portrait?: TextStyleBase;
  _landscape?: TextStyleBase;
}

interface IImageStyle extends ImageStyleBase {
  _portrait?: ImageStyleBase;
  _landscape?: ImageStyleBase;
}

export type TOrientation = 'portrait' | 'landscape';

export type TNamedStyles<T> = { [P in keyof T]: IViewStyle | ITextStyle | IImageStyle };
