import {
  setCustomTouchableOpacity,
  setCustomText,
  setCustomTextInput,
} from 'react-native-global-props';

export const setGlobalProps = () => {
  const defaultFontStyle = {
    fontFamily: 'NanumSquareRoundEB',
    fontWeight: '800',
  } as const;

  setCustomText({style: defaultFontStyle});
  setCustomTextInput({style: defaultFontStyle});
  setCustomTouchableOpacity({activeOpacity: 0.6});
};
