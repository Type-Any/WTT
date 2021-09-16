import React, {FC, useState} from 'react';
import styled from '@emotion/native';
import {FlatList, StyleSheet} from 'react-native';
import Tab from '../atoms/Tab';
import TodoListItem from '../molecules/TodoListItem';
import {ETodoStatus, ITodo, useTodos} from '../../swr/todos';
import {useMutation} from '../../utils/hooks/useMutation';
import {request} from '../../utils/fetcher';

interface IProps {
  categoryId: number;
}

const TodoListTabSwitch: FC<IProps> = ({categoryId}) => {
  const {todos: allTodos, mutate} = useTodos(categoryId);
  const [updateTodoApi] = useMutation<{
    categoryId: number;
    status: ETodoStatus;
  }>(request.patch, mutate);

  const [focusedIdx, setFocusedIdx] = useState(0);
  const {todos, dones} = seperateTodos(allTodos);
  const tabs = [
    {key: 'MUST', label: `MUST (${todos?.length || 0})`},
    {key: 'DONE', label: `DONE (${dones?.length || 0})`},
  ];

  const todoList = (() => {
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
          contentContainerStyle={styles.flatList}
          data={todoList}
          keyExtractor={({id}) => `todo-${id}`}
          ItemSeparatorComponent={Margin}
          renderItem={({item: {id, status, title}}) => {
            const toggledStatus = (() =>
              status === ETodoStatus.Todo
                ? ETodoStatus.Done
                : ETodoStatus.Todo)();

            return (
              <TodoListItem
                checked={status === ETodoStatus.Done}
                title={title}
                onPress={() => {
                  updateTodoApi(`/todos/${id}`, {
                    categoryId,
                    status: toggledStatus,
                  });
                }}
              />
            );
          }}
        />
      </ContentContainer>
    </Container>
  );
};

export default TodoListTabSwitch;

const styles = StyleSheet.create({
  flatList: {
    paddingHorizontal: 15,
    paddingTop: 32,
  },
});

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

const Margin = styled.View`
  height: 16px;
`;
