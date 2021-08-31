import React, {FC} from 'react';
import styled from '@emotion/native';
import NanumFont from './NanumFont';

interface IProps {
  title?: string;
  onPress?: () => void;
}

const Button: FC<IProps> = ({title, onPress}) => (
  <Touchable onPress={onPress}>
    <Title>{title}</Title>
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
`;

const Title = styled(NanumFont)`
  font-size: 13px;
  line-height: 13px;
  color: #fff;
`;
