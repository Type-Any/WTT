import {TextProps} from 'react-native';
import styled from '@emotion/native';
import {getFontFamilyFromStyle} from '../../utils/fonts';

const NanumFont = styled.Text<TextProps>`
  font-family: ${({style}) => {
    return getFontFamilyFromStyle(style);
  }};
`;

export default NanumFont;
