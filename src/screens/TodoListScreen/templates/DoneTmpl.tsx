import React, {FC} from 'react';
import {FlatList} from 'react-native';
import styled from '@emotion/native';
import TodoListItem from '../../../components/atoms/TodoListItem';

interface IProps {}

const DoneTmpl: FC<IProps> = () => {
  const todos = [
    {id: 1, checked: true, title: `19y Macbook pro 15'`},
    {id: 2, checked: true, title: `Edit Monitoring Metrics`},
    {id: 3, checked: true, title: `19y Macbook pro 15'`},
  ];

  return (
    <FlatList
      contentContainerStyle={{paddingHorizontal: 25, paddingTop: 32}}
      data={todos}
      keyExtractor={({id}) => `${id}`}
      renderItem={({item}) => (
        <TodoListItem checked={item?.checked} title={item?.title} />
      )}
      ItemSeparatorComponent={Margin}
    />
  );
};

export default DoneTmpl;

const Margin = styled.View`
  height: 28px;
`;
