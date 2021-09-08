import React, {FC} from 'react';
import styled, {css} from '@emotion/native';

interface IProps {
  label: string;
  focused?: boolean;
  onPress?: () => void;
}

const Tab: FC<IProps> = ({label, focused, onPress}) => (
  <Touchable focused={focused} onPress={onPress}>
    <Label focused={focused}>{label}</Label>
  </Touchable>
);

export default Tab;

const Touchable = styled.TouchableOpacity<{focused?: boolean}>`
  margin-right: 19px;
  ${({focused = false}) =>
    focused &&
    css`
      border-bottom-color: #57dadc;
      border-bottom-width: 3px;
    `}
`;

const Label = styled.Text<{focused?: boolean}>`
  font-size: 14px;
  line-height: 35px;
  color: ${({focused = false}) => (focused ? '#102d2d' : '#c8c8c8')};
`;
