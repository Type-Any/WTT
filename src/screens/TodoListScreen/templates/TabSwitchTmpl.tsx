import React, {FC, useState} from 'react';
import styled, {css} from '@emotion/native';
import NanumFont from '../../../components/atoms/NanumFont';
import {ETodoStatus, ITodo} from '../../../apis/todos/types';
import {FlatList} from 'react-native';
import TodoListItem from '../../../components/molecules/TodoListItem';
import {useGetTodosApi} from '../../../apis/todos/useGetTodosApi';
import {useNavParams} from '../../../contexts/Nav';

export interface IProps {}

const TabViewTmpl: FC<IProps> = ({}) => {
  const {categoryId} = useNavParams('/category/todo');
  const {todos: allTodos} = useGetTodosApi(categoryId);

  const [focusedIdx, setFocusedIdx] = useState(0);
  const {todos, dones} = seperateTodos(allTodos);
  const tabs = [
    {key: 'MUST', label: `MUST (${todos?.length || 0})`},
    {key: 'DONE', label: `DONE (${dones?.length || 0})`},
  ];

  const data = (() => {
    switch (focusedIdx) {
      case 0:
        return todos;
      case 1:
        return dones;
    }
  })();

  return (
    <Container>
      <TabBar>
        {tabs?.map(({key, label}, idx) => (
          <Tab
            key={key}
            label={label}
            focused={idx === focusedIdx}
            onPress={() => setFocusedIdx(idx)}
          />
        ))}
      </TabBar>

      <ContentContainer>
        <FlatList
          contentContainerStyle={{
            paddingHorizontal: 15,
            paddingTop: 32,
          }}
          data={data}
          keyExtractor={({id}) => `${id}`}
          ItemSeparatorComponent={Margin}
          renderItem={({item: {status, title}}) => {
            const checked = status === ETodoStatus.Done;
            return <TodoListItem checked={checked} title={title} />;
          }}
        />
      </ContentContainer>
    </Container>
  );
};

export default TabViewTmpl;

const Tab: FC<{
  label: string;
  focused?: boolean;
  onPress?: () => void;
}> = ({label, focused, onPress}) => (
  <TabButton focused={focused} onPress={onPress}>
    <TabLabel focused={focused}>{label}</TabLabel>
  </TabButton>
);

const seperateTodos = (
  todos: ITodo[],
  seperated: {todos: ITodo[]; dones: ITodo[]} = {todos: [], dones: []},
): {todos: ITodo[]; dones: ITodo[]} => {
  const [nextTodo, ...rest] = todos;
  if (!nextTodo) return seperated;

  switch (nextTodo?.status) {
    case ETodoStatus.Todo:
      return seperateTodos(rest, {
        ...seperated,
        todos: [...seperated?.todos, nextTodo],
      });
    case ETodoStatus.Done:
      return seperateTodos(rest, {
        ...seperated,
        dones: [...seperated?.dones, nextTodo],
      });
  }
};

const Container = styled.View`
  flex: 1;
`;

const ContentContainer = styled.View`
  flex: 1;
`;

const TabBar = styled.View`
  width: 100%;
  height: 30px;
  padding: 0px 25px;
  flex-direction: row;
`;

const TabButton = styled.TouchableOpacity<{focused?: boolean}>`
  margin-right: 19px;
  ${({focused = false}) =>
    focused &&
    css`
      border-bottom-color: #57dadc;
      border-bottom-width: 3px;
    `}
`;

const TabLabel = styled(NanumFont)<{focused?: boolean}>`
  font-size: 14px;
  line-height: 35px;
  color: ${({focused = false}) => (focused ? '#102d2d' : '#c8c8c8')};
`;

const Margin = styled.View`
  height: 16px;
`;
