import React, {FC} from 'react';
import styled from '@emotion/native';
import {TouchableOpacityProps} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faApple,
  faFacebookF,
  faGoogle,
  faTwitter,
} from '@fortawesome/free-brands-svg-icons';

type BrandType = 'apple' | 'google' | 'facebook' | 'twitter';

interface IProps extends TouchableOpacityProps {
  type?: BrandType;
}

const SocialButton: FC<IProps> = ({type = 'apple', ...props}) => (
  <Container {...props}>
    <BrandIcon type={type} />
    <BrandTitle type={type} />
  </Container>
);

export default SocialButton;

const BrandIcon: FC<{type: BrandType}> = ({type}) => {
  switch (type) {
    case 'apple':
      return (
        <FontAwesomeIcon icon={faApple} size={16} style={{marginTop: -3}} />
      );
    case 'facebook':
      return (
        <FontAwesomeIcon
          icon={faFacebookF}
          size={13}
          color={'#4267b2'}
          style={{marginTop: -3}}
        />
      );
    case 'google':
      return (
        <FontAwesomeIcon
          icon={faGoogle}
          color={'#d95040'}
          size={13}
          style={{marginTop: -3}}
        />
      );
    case 'twitter':
      return (
        <FontAwesomeIcon
          icon={faTwitter}
          color={'#1da1f2'}
          size={16}
          style={{marginTop: -3}}
        />
      );
  }
};

const BrandTitle: FC<{type: BrandType}> = ({type}) => {
  switch (type) {
    case 'apple':
      return (
        <SocialButtonTitle>{'Start with Apple account'}</SocialButtonTitle>
      );
    case 'facebook':
      return (
        <SocialButtonTitle>
          {'Start with '}
          <SocialButtonTitle style={{color: '#4267b2'}}>
            {'Facebook'}
          </SocialButtonTitle>
          {' account'}
        </SocialButtonTitle>
      );
    case 'google':
      return (
        <SocialButtonTitle>
          {'Start with '}
          <SocialButtonTitle style={{color: '#5186ed'}}>
            {'G'}
          </SocialButtonTitle>
          <SocialButtonTitle style={{color: '#d95040'}}>
            {'o'}
          </SocialButtonTitle>
          <SocialButtonTitle style={{color: '#f2bd42'}}>
            {'o'}
          </SocialButtonTitle>
          <SocialButtonTitle style={{color: '#58a55d'}}>
            {'l'}
          </SocialButtonTitle>
          <SocialButtonTitle style={{color: '#d95040'}}>
            {'e'}
          </SocialButtonTitle>
          {' account'}
        </SocialButtonTitle>
      );
    case 'twitter':
      return (
        <SocialButtonTitle>
          {'Start with '}
          <SocialButtonTitle style={{color: '#1da1f2'}}>
            {'Twitter'}
          </SocialButtonTitle>
          {' account'}
        </SocialButtonTitle>
      );
  }
};

const Container = styled.TouchableOpacity`
  width: 100%;
  height: 43px;
  border-radius: 21.5px;
  border-color: #dcdcdc;
  border-width: 1px;
  align-items: center;
  justify-content: center;
  flex-direction: row;
`;

const SocialButtonTitle = styled.Text<{color?: string}>`
  margin-left: 8px;
  font-size: 13px;
  line-height: 16px;
  color: ${({color = '#000'}) => color};
`;
