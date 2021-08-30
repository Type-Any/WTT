import {TextInputProps} from 'react-native';
import styled from '@emotion/native';
import {getFontFamilyFromStyle} from '../../utils/fonts';

const NanumInput = styled.TextInput<TextInputProps>`
  font-family: ${({style}) => {
    return getFontFamilyFromStyle(style);
  }};
`;

export default NanumInput;
