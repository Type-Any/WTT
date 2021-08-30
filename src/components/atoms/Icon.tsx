import {FC, createElement} from 'react';
import {SvgProps} from 'react-native-svg';
import Logo from '../../assets/icons/logo.svg';

const icons = {
  logo: Logo,
} as const;

interface IProps extends SvgProps {
  type: keyof typeof icons;
}

const Icon: FC<IProps> = ({type, ...props}) =>
  createElement(icons[type], props);

export default Icon;
