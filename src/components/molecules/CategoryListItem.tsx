import React, {FC} from 'react';
import styled from '@emotion/native';
import Icon from '../atoms/Icon';
import {TouchableOpacityProps} from 'react-native';
import {useAppNav} from '../../utils/hooks/useNav';
import {ICategory} from '../../swr/categories';

interface IProps extends ICategory, TouchableOpacityProps {}

const CategoryListItem: FC<IProps> = ({id, name, style}) => {
  const {navigate} = useAppNav();

  return (
    <Container
      style={style}
      onPress={() => navigate('/category/todo', {categoryId: id})}>
      <Name>
        <Icon
          type={'folder'}
          width={18}
          height={18}
          style={{marginRight: 17}}
        />
        {name}
      </Name>

      <Icon type={'right'} width={13} height={13} />
    </Container>
  );
};

export default CategoryListItem;

const Container = styled.TouchableOpacity`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const Name = styled.Text`
  font-size: 17px;
  line-height: 24px;
  color: #102d2d;
`;
