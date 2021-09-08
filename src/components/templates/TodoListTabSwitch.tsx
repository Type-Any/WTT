import React, {FC, useState} from 'react';
import styled from '@emotion/native';
import {FlatList, StyleSheet} from 'react-native';
import {useGetTodosApi} from '../../apis/todos/useGetTodosApi';
import {
  useDoneTodoApi,
  useUndoneTodoApi,
} from '../../apis/todos/usePatchTodoApi';
import Tab from '../atoms/Tab';
import {ETodoStatus, ITodo} from '../../apis/todos/types';
import TodoListItem from '../molecules/TodoListItem';

interface IProps {
  categoryId: number;
}

const TodoListTabSwitch: FC<IProps> = ({categoryId}) => {
  const {todos: allTodos} = useGetTodosApi(categoryId);
  const doneTodoApi = useDoneTodoApi(categoryId);
  const undoneTodoApi = useUndoneTodoApi(categoryId);

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
          contentContainerStyle={styles.flatList}
          data={data}
          keyExtractor={({id}) => `todo-${id}`}
          ItemSeparatorComponent={Margin}
          renderItem={({item: {id, status, title}}) => {
            const toggleTodo = () => {
              switch (status) {
                case ETodoStatus.Todo:
                  doneTodoApi(id);
                  break;
                case ETodoStatus.Done:
                  undoneTodoApi(id);
                  break;
              }
            };

            return (
              <TodoListItem
                checked={status === ETodoStatus.Done}
                title={title}
                onPress={toggleTodo}
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
