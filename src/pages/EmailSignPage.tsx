import React from 'react';
import styled from '@emotion/native';
import Button from '../components/atoms/Button';
import {useState} from 'react';
import Body from '../components/atoms/Body';
import Icon from '../components/atoms/Icon';
import {useAuth} from '../contexts/Api';
import {useRef} from 'react';
import {TextInput} from 'react-native';
import {useNav} from '../contexts/Nav';

const EmailSignPage = () => {
  const {loginAction} = useAuth();
  const {goBack} = useNav();

  const passwordInputRef = useRef<TextInput | null>(null);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const focusPassword = () => passwordInputRef?.current?.focus?.();
  const submit = () => loginAction(email, password);

  return (
    <Body bounces={false}>
      <Container>
        <Section>
          <Icon type={'logo'} />
          <Title>{'WHAT THE TODO'}</Title>
        </Section>

        <Section marginTop={92}>
          <InputTitle>{'Start with Email'}</InputTitle>

          <Input
            autoCapitalize={'none'}
            placeholder={'Input your email address'}
            value={email}
            onChangeText={setEmail}
            onSubmitEditing={focusPassword}
          />

          <Input
            ref={passwordInputRef}
            autoCapitalize={'none'}
            placeholder={'Input password'}
            value={password}
            onChangeText={setPassword}
            secureTextEntry={true}
            onSubmitEditing={submit}
          />

          <Button title={'Ready to start!'} onPress={submit} />
        </Section>

        <Section marginTop={26}>
          <Or>{'or'}</Or>

          <BackButton onPress={goBack}>
            <BackButtonTitle>
              {'Back to select sign in with social network'}
            </BackButtonTitle>
          </BackButton>
        </Section>

        <Footer>
          <FooterTitle>{'Copyright'}</FooterTitle>
          <FooterTitle>{'Heebeancreative'}</FooterTitle>
        </Footer>
      </Container>
    </Body>
  );
};

export default EmailSignPage;

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 0px 48px;
`;

const Section = styled.View<{marginTop?: number}>`
  width: 100%;
  align-items: center;
  margin-top: ${({marginTop = 0}) => marginTop}px;
`;

const Title = styled.Text`
  margin-top: 21px;
  font-size: 30px;
  line-height: 29px;
  color: #102d2d;
`;

const InputTitle = styled.Text`
  margin-bottom: 11px;
  font-size: 17px;
  line-height: 29px;
  color: #102d2d;
`;

const Input = styled.TextInput`
  margin-bottom: 15px;
  font-size: 15px;
  border-width: 1px;
  border-color: #dcdcdc;
  width: 100%;
  height: 43px;
  border-radius: 21.5px;
  padding: 0px 24px;
`;

const Or = styled.Text`
  font-size: 13px;
  line-height: 13px;
  color: #c2c2c2;
`;

const BackButton = styled.TouchableOpacity`
  margin-top: 17px;
`;

const BackButtonTitle = styled.Text`
  font-size: 12px;
  line-height: 17px;
  color: #57dadc;
`;

const Footer = styled.View`
  position: absolute;
  bottom: 39px;
  width: 100%;
  align-items: center;
`;

const FooterTitle = styled.Text`
  font-size: 12px;
  line-height: 18px;
  color: #c2d1d1;
`;
