import React, {FC} from 'react';
import styled from '@emotion/native';
import Icon, {AssetIconType} from './Icon';
import {TouchableOpacityProps} from 'react-native';

interface IProps extends TouchableOpacityProps {
  title?: string;
  onPress?: () => void;
  iconRight?: AssetIconType;
  iconLeft?: AssetIconType;
}

const Button: FC<IProps> = ({
  title,
  iconLeft,
  iconRight,
  onPress,
  ...props
}) => (
  <Touchable onPress={onPress} {...props}>
    {iconLeft && (
      <Icon type={iconLeft} width={16} height={16} style={{marginRight: 8}} />
    )}

    <Title>{title}</Title>

    {iconRight && (
      <Icon type={iconRight} width={16} height={16} style={{marginLeft: 8}} />
    )}
  </Touchable>
);

export default Button;

const Touchable = styled.TouchableOpacity`
  width: 100%;
  height: 43px;
  border-radius: 21.5px;
  background-color: #354343;
  align-items: center;
  justify-content: center;
  flex-direction: row;
`;

const Title = styled.Text`
  font-size: 13px;
  line-height: 13px;
  color: #fff;
`;
