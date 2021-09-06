import React, {FC, createElement} from 'react';
import {TouchableOpacity} from 'react-native';
import {SvgProps} from 'react-native-svg';

// icons
import Logo from '../../assets/icons/logo.svg';
import Setting from '../../assets/icons/setting.svg';
import Today from '../../assets/icons/today.svg';
import Someday from '../../assets/icons/someday.svg';
import SomedayGray from '../../assets/icons/someday-gray.svg';
import Folder from '../../assets/icons/folder.svg';
import Right from '../../assets/icons/right.svg';
import Plus from '../../assets/icons/plus.svg';
import Trash from '../../assets/icons/trash.svg';
import List from '../../assets/icons/list.svg';
import Down from '../../assets/icons/down.svg';
import CheckedCircle from '../../assets/icons/checked-circle.svg';

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
  down: Down,
  'checked-circle': CheckedCircle,
  'someday-gray': SomedayGray,
} as const;

export type AssetIconType = keyof typeof icons;

interface IProps extends SvgProps {
  type: AssetIconType;
  onPress?: () => void;
}

const Icon: FC<IProps> = ({type, onPress, ...props}) =>
  onPress ? (
    <TouchableOpacity onPress={onPress}>
      {createElement(icons[type], {...props})}
    </TouchableOpacity>
  ) : (
    createElement(icons[type], {...props})
  );

export default Icon;
