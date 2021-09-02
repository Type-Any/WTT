import React, {FC} from 'react';
import styled, {css} from '@emotion/native';

interface IProps {
  checked: boolean;
  onPress?: () => void;
}

const Checkbox: FC<IProps> = ({checked, onPress}) => (
  <CheckIcon
    checked={checked}
    onPress={onPress}
    activeOpacity={onPress ? 1 : undefined}
  />
);

export default Checkbox;

const CheckIcon = styled.TouchableOpacity<IProps>`
  width: 24px;
  height: 24px;
  border-radius: 24px;
  ${({checked}) =>
    checked
      ? css`
          background-color: #57dadc;
        `
      : css`
          border-color: #354343;
          border-width: 2px;
        `}
`;
