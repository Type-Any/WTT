import React from 'react';
import {FlatList} from 'react-native';
import styled from '@emotion/native';
import {FC} from 'react';
import TodoListItem from '../../../components/atoms/TodoListItem';

interface IProps {}

const MustTmpl: FC<IProps> = () => {
  const todos = [
    {id: 1, checked: true, title: `19y Macbook pro 15'`},
    {id: 2, checked: false, title: `Edit Monitoring Metrics`},
    {id: 3, checked: false, title: `19y Macbook pro 15'`},
  ];

  return (
    <FlatList
      contentContainerStyle={{paddingHorizontal: 15, paddingTop: 32}}
      data={todos}
      keyExtractor={({id}) => `${id}`}
      renderItem={({item}) => (
        <TodoListItem checked={item?.checked} title={item?.title} />
      )}
      ItemSeparatorComponent={Margin}
    />
  );
};

export default MustTmpl;

const Margin = styled.View`
  height: 16px;
`;
