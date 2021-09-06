import React, {FC} from 'react';
import styled from '@emotion/native';
import Icon from './Icon';
import {TouchableOpacity} from 'react-native';

interface IProps {
  checked: boolean;
  onPress?: () => void;
}

const Checkbox: FC<IProps> = ({checked, onPress}) => (
  <TouchableWrapper onPress={onPress}>
    {checked ? (
      <Icon type={'checked-circle'} width={24} height={24} />
    ) : (
      <EmptyCircle />
    )}
  </TouchableWrapper>
);

const TouchableWrapper: FC<{onPress?: () => void}> = ({onPress, children}) =>
  onPress ? (
    <TouchableOpacity onPress={onPress}>{children}</TouchableOpacity>
  ) : (
    <>{children}</>
  );

export default Checkbox;

const EmptyCircle = styled.View`
  width: 24px;
  height: 24px;
  border-radius: 24px;
  border-color: #354343;
  border-width: 2px;
`;
