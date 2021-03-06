import React from 'react';
import styled from '@emotion/native';
import Icon from '../components/atoms/Icon';
import SocialButton from '../components/atoms/SocialButton';
import {useAppNav} from '../utils/hooks/useNav';

const SignGatewayPage = () => {
  const {navigate} = useAppNav();

  return (
    <Container>
      <Section>
        <Icon type={'logo'} />
        <Title>{'WHAT THE TODO'}</Title>
      </Section>

      <Section marginTop={92}>
        <SocialButton type={'apple'} style={{marginBottom: 10}} />
        <SocialButton type={'facebook'} style={{marginBottom: 10}} />
        <SocialButton type={'google'} style={{marginBottom: 10}} />
        <SocialButton type={'twitter'} />
      </Section>

      <Section marginTop={26}>
        <Or>{'or'}</Or>

        <EmailSignButton onPress={() => navigate('/sign/email')}>
          <EmailSignButtonTitle>
            {'Start with Email account'}
          </EmailSignButtonTitle>
        </EmailSignButton>
      </Section>

      <Footer>
        <FooterTitle>{'Copyright'}</FooterTitle>
        <FooterTitle>{'Heebeancreative'}</FooterTitle>
      </Footer>
    </Container>
  );
};

export default SignGatewayPage;

const Container = styled.View`
  flex: 1;
  padding: 0px 43px;
  align-items: center;
  justify-content: center;
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

const Or = styled.Text`
  font-size: 13px;
  line-height: 13px;
  color: #c2c2c2;
`;

const EmailSignButton = styled.TouchableOpacity`
  margin-top: 17px;
`;

const EmailSignButtonTitle = styled.Text`
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
