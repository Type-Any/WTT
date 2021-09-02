import React, {FC} from 'react';
import styled from '@emotion/native';
import Checkbox from './Checkbox';
import NanumFont from './NanumFont';
import {TouchableOpacityProps} from 'react-native';

interface IProps extends TouchableOpacityProps {
  checked: boolean;
  title: string;
}

const TodoListItem: FC<IProps> = ({checked, title, ...props}) => (
  <Touchable {...props}>
    <Checkbox checked={checked} />
    <Title>{title}</Title>
  </Touchable>
);

export default TodoListItem;

const Touchable = styled.TouchableOpacity`
  width: 100%;
  flex-direction: row;
  align-items: center;
`;

const Title = styled(NanumFont)`
  margin-left: 13px;
  font-size: 12px;
  line-height: 14px;
  color: #354242;
`;
