import React, {FC} from 'react';
import {FlatList} from 'react-native';
import styled from '@emotion/native';
import TodoListItem from '../../../components/molecules/TodoListItem';
import {ETodoStatus, ITodo} from '../../../apis/todos/types';

interface IProps {
  dones: ITodo[];
}

const DoneTmpl: FC<IProps> = ({dones}) => {
  return (
    <FlatList
      contentContainerStyle={{paddingHorizontal: 15, paddingTop: 32}}
      data={dones}
      keyExtractor={({id}) => `${id}`}
      ItemSeparatorComponent={Margin}
      renderItem={({item: {status, title}}) => {
        const checked = status === ETodoStatus.Done;
        return <TodoListItem checked={checked} title={title} />;
      }}
    />
  );
};

export default DoneTmpl;

const Margin = styled.View`
  height: 16px;
`;
