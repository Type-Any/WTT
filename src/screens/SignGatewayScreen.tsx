import React from 'react';
import styled from '@emotion/native';
import Body from '../components/atoms/Body';
import Icon from '../components/atoms/Icon';
import NanumFont from '../components/atoms/NanumFont';
import SocialButton from '../components/atoms/SocialButton';
import {useNav} from '../contexts/Nav';

const SignGatewayScreen = () => {
  const {navigate} = useNav();

  return (
    <Body bounces={false}>
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
    </Body>
  );
};

export default SignGatewayScreen;

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

const Title = styled(NanumFont)`
  margin-top: 21px;
  font-size: 30px;
  line-height: 29px;
  color: #102d2d;
  font-weight: 800;
`;

const Or = styled(NanumFont)`
  font-size: 13px;
  line-height: 13px;
  font-weight: 800;
  color: #c2c2c2;
`;

const EmailSignButton = styled.TouchableOpacity`
  margin-top: 17px;
`;

const EmailSignButtonTitle = styled(NanumFont)`
  font-size: 12px;
  line-height: 17px;
  font-weight: 800;
  color: #57dadc;
`;

const Footer = styled.View`
  position: absolute;
  bottom: 39px;
  width: 100%;
  align-items: center;
`;

const FooterTitle = styled(NanumFont)`
  font-size: 12px;
  line-height: 18px;
  font-weight: 800;
  color: #c2d1d1;
`;
