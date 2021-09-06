import React from 'react';
import {FlatList} from 'react-native';
import styled from '@emotion/native';
import {FC} from 'react';
import TodoListItem from '../../../components/molecules/TodoListItem';
import {ETodoStatus, ITodo} from '../../../apis/todos/types';

interface IProps {
  todos: ITodo[];
}

const MustTmpl: FC<IProps> = ({todos}) => {
  return (
    <FlatList
      contentContainerStyle={{paddingHorizontal: 15, paddingTop: 32}}
      data={todos}
      keyExtractor={({id}) => `${id}`}
      ItemSeparatorComponent={Margin}
      renderItem={({item: {status, title}}) => {
        const checked = status === ETodoStatus.Done;
        return <TodoListItem checked={checked} title={title} />;
      }}
    />
  );
};

export default MustTmpl;

const Margin = styled.View`
  height: 16px;
`;
