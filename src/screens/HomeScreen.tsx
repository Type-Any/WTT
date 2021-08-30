import React from 'react';
import styled from '@emotion/native';
import Body from '../components/atoms/Body';
import {useAuth} from '../contexts/Api';

const HomeScreen = () => {
  const {logoutAction} = useAuth();

  return (
    <Body>
      <Container>
        <Title>This is home</Title>
        <Button onPress={logoutAction}>
          <Title>Log Out</Title>
        </Button>
      </Container>
    </Body>
  );
};

export default HomeScreen;

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const Title = styled.Text`
  font-size: 13px;
  font-weight: bold;
`;

const Button = styled.TouchableOpacity`
  padding: 20px;
  align-items: center;
  justify-content: center;
`;
