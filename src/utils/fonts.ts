import {StyleProp, TextStyle} from 'react-native';

type FontWeight =
  | 'normal'
  | 'bold'
  | '100'
  | '200'
  | '300'
  | '400'
  | '500'
  | '600'
  | '700'
  | '800'
  | '900';

const defaultFontWeight: FontWeight = '800';

export const getFontFamilyFromStyle = (style: StyleProp<TextStyle>) => {
  if (Array.isArray(style)) {
    const styleArr = style.flat() as any;
    let fontWeight: FontWeight = defaultFontWeight;
    for (const styleObj of styleArr) {
      if (styleObj && styleObj['fontWeight']) {
        fontWeight = styleObj['fontWeight'];
      }
    }

    return switchFontFamily(fontWeight);
  } else {
    const {fontWeight = defaultFontWeight} = (style as any) || {};
    return switchFontFamily(fontWeight);
  }
};

const switchFontFamily = (fontWeight: FontWeight) => {
  switch (fontWeight) {
    case '100':
    case '200':
    case '300':
      return 'NanumSquareRoundL';
    case '400':
    case 'normal':
    case '500':
    case '600':
      return 'NanumSquareRoundR';
    case '700':
    case 'bold':
      return 'NanumSquareRoundB';
    case '800':
    case '900':
      return 'NanumSquareRoundEB';
  }
};
