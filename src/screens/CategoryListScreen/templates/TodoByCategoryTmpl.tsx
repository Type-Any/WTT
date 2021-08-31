import React from 'react';
import styled from '@emotion/native';
import NanumFont from '../../../components/atoms/NanumFont';
import Icon from '../../../components/atoms/Icon';
import {useNav} from '../../../contexts/Nav';

const TodoByCategoryTmpl = () => {
  const {navigate} = useNav();

  const categories = [
    {name: 'Shopping List'},
    {name: 'at Job Todo'},
    {name: 'Sub job'},
    {name: 'Shopping List 2'},
  ];

  return (
    <>
      {categories?.map(({name}, idx) => (
        <ItemButton
          key={`category_${name}`}
          style={{marginTop: idx && 25}}
          onPress={() => navigate('/category/todo')}>
          <ItemTitle>
            <Icon
              type={'folder'}
              width={18}
              height={18}
              style={{marginRight: 17}}
            />
            {name}
          </ItemTitle>

          <Icon type={'right'} width={13} height={13} />
        </ItemButton>
      ))}
    </>
  );
};
export default TodoByCategoryTmpl;

const ItemButton = styled.TouchableOpacity`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const ItemTitle = styled(NanumFont)`
  font-size: 17px;
  line-height: 24px;
  color: #102d2d;
`;
