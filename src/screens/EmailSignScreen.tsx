import React from 'react';
import styled from '@emotion/native';
import Section from '../components/atoms/Section';
import Button from '../components/atoms/Button';
import {useState} from 'react';
import Body from '../components/atoms/Body';
import Icon from '../components/atoms/Icon';
import {useAuth} from '../contexts/Api';

const EmailSignScreen = () => {
  const {loginAction} = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <Body>
      <Container>
        <Section>
          <Icon type={'logo'} />
        </Section>

        <Section>
          <Title>{'Start with Email'}</Title>
        </Section>

        <Section marginTop={11}>
          <Input
            autoCapitalize={'none'}
            placeholder={'Input your email address'}
            value={email}
            onChangeText={setEmail}
          />
        </Section>

        <Section marginTop={15}>
          <Input
            autoCapitalize={'none'}
            placeholder={'Input password'}
            value={password}
            onChangeText={setPassword}
            secureTextEntry={true}
          />
        </Section>

        <Section marginTop={15}>
          <Button
            title={'Ready to start!'}
            onPress={() => loginAction(email, password)}
          />
        </Section>
      </Container>
    </Body>
  );
};

export default EmailSignScreen;

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 0px 48px;
`;

const Title = styled.Text`
  font-size: 17px;
  line-height: 29px;
  color: #102d2d;
`;

const Input = styled.TextInput`
  font-size: 15px;
  font-weight: bold;
  border-width: 1px;
  border-color: #dcdcdc;
  width: 100%;
  height: 43px;
  border-radius: 21.5px;
  padding: 0px 24px;
`;
