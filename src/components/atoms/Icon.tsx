import React, {FC, createElement} from 'react';
import {TouchableOpacity} from 'react-native';
import {SvgProps} from 'react-native-svg';

// icons
import Logo from '../../assets/icons/logo.svg';
import Setting from '../../assets/icons/setting.svg';
import Today from '../../assets/icons/today.svg';
import Someday from '../../assets/icons/someday.svg';
import Folder from '../../assets/icons/folder.svg';
import Right from '../../assets/icons/right.svg';
import Plus from '../../assets/icons/plus.svg';
import Trash from '../../assets/icons/trash.svg';
import List from '../../assets/icons/list.svg';

const icons = {
  logo: Logo,
  setting: Setting,
  today: Today,
  someday: Someday,
  folder: Folder,
  right: Right,
  plus: Plus,
  trash: Trash,
  list: List,
} as const;

interface IProps extends SvgProps {
  type: keyof typeof icons;
  onPress?: () => void;
}

const Icon: FC<IProps> = ({type, onPress, ...props}) => (
  <TouchableOpacity onPress={onPress} activeOpacity={!onPress ? 1 : undefined}>
    {createElement(icons[type], {...props})}
  </TouchableOpacity>
);

export default Icon;
