import React, {FC} from 'react';
import styled from '@emotion/native';
import {ScrollViewProps} from 'react-native';

interface IProps extends ScrollViewProps {}

const Body: FC<IProps> = ({children, ...props}) => (
  <Container {...props} contentContainerStyle={{flexGrow: 1}}>
    {children}
  </Container>
);

export default Body;

const Container = styled.ScrollView`
  flex: 1;
  background-color: #fff;
`;
