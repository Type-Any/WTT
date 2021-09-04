import React, {FC} from 'react';
import styled from '@emotion/native';
import NanumFont from '../atoms/NanumFont';
import Icon from '../atoms/Icon';
import {useNav} from '../../contexts/Nav';
import {ICategory} from '../../apis/category/useCategories';
import {TouchableOpacityProps} from 'react-native';

interface IProps extends ICategory, TouchableOpacityProps {}

const CategoryListItem: FC<IProps> = ({id, name, style}) => {
  const {navigate} = useNav();

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

const Name = styled(NanumFont)`
  font-size: 17px;
  line-height: 24px;
  color: #102d2d;
`;
